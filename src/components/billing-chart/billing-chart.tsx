import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  filterEntriesByRepositoryName,
  getColorFromRepositoryName,
  getPriceByRepositoryName,
  UsageReportDay,
  UsageReportWeek,
} from "../../util/group-entries";
import { getDay, lightFormat } from "date-fns";
import { dayOfWeek, isStringDateValue } from "../../util/date-util";
import { RepositoryTableContext } from "../context/repository-table-context";
import { RepositoryColorContext } from "../context/repository-color-context";
import styled from "styled-components";
import { Payload } from "recharts/types/component/DefaultTooltipContent";
import { TooltipEntry, TooltipText } from "./tooltip-entry";

const tooltipLabelFormatter = (label: string) =>
  isStringDateValue(label)
    ? `${dayOfWeek[getDay(new Date(label))]}, ${lightFormat(
        new Date(label),
        "dd.MM."
      )}`
    : label;

const sortTooltipPayloadByPrice = (
  a: Payload<number, string>,
  b: Payload<number, string>
): number => {
  if (a.value !== undefined && b.value !== undefined) {
    return b.value - a.value;
  } else {
    return -1;
  }
};

//Setting the generics for Tooltip
class TypedTooltip extends Tooltip<number, string> {}

const TooltipContainer = styled.div`
  border-radius: 4px;
  border: none;
  background: white;
  padding: 16px;
`;

const TooltipHeading = styled.h4`
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  color: #202840;
`;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (
    !payload ||
    payload.length === 0 ||
    payload.every((tooltipEntry) => tooltipEntry.value === 0)
  ) {
    return (
      <TooltipContainer>
        <TooltipHeading>{tooltipLabelFormatter(label)}</TooltipHeading>
        <TooltipText>no expenses, yeah 🎉</TooltipText>
      </TooltipContainer>
    );
  }

  if (active && payload && payload.length) {
    const sortedPayload = payload.sort(sortTooltipPayloadByPrice);

    return (
      <TooltipContainer>
        <TooltipHeading>{tooltipLabelFormatter(label)}</TooltipHeading>
        {sortedPayload.map((tooltipEntry) => {
          if (tooltipEntry.value !== 0) {
            return (
              <TooltipEntry
                tooltipEntry={tooltipEntry}
                key={tooltipEntry.name}
              />
            );
          }
        })}
      </TooltipContainer>
    );
  }
  return null;
};

interface BillingChartProps {
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
  repositoryNames: string[];
  entriesGroupedPerDay: UsageReportDay[];
  entriesGroupedPerWeek: UsageReportWeek[];
  diagrammType: "Bar" | "Line";
}

export const BillingChart = ({
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  entriesGroupedPerDay,
  entriesGroupedPerWeek,
  diagrammType,
}: BillingChartProps): JSX.Element => {
  const [currentData, setCurrentData] = useState<
    UsageReportDay[] | UsageReportWeek[]
  >();

  const { activeRepositories } = useContext(RepositoryTableContext);
  const colorsPerRepositoryName = useContext(RepositoryColorContext);

  useEffect(() => {
    if (groupedBy === "daily") {
      setCurrentData(
        filterEntriesByRepositoryName(entriesGroupedPerDay, activeRepositories)
      );
    } else {
      setCurrentData(
        filterEntriesByRepositoryName(entriesGroupedPerWeek, activeRepositories)
      );
    }
  }, [entriesGroupedPerDay, entriesGroupedPerWeek]);

  useEffect(() => {
    if (groupedBy === "daily") {
      setCurrentData(
        filterEntriesByRepositoryName(entriesGroupedPerDay, activeRepositories)
      );
    } else {
      setCurrentData(
        filterEntriesByRepositoryName(entriesGroupedPerWeek, activeRepositories)
      );
    }
  }, [activeRepositories]);

  const sharedXAxis = (
    <XAxis
      dataKey={groupedBy === "daily" ? "day" : "week"}
      tick={{ fill: "white" }}
      axisLine={false}
      tickLine={false}
      tickFormatter={(tick) =>
        isStringDateValue(tick) ? lightFormat(new Date(tick), "dd.MM.") : tick
      }
      minTickGap={10}
      dy={8}
    />
  );
  const sharedYAxis = (
    <YAxis
      domain={[0, maxValueOfYAxis]}
      unit=" $"
      tickCount={maxValueOfYAxis + 1}
      tick={{ fill: "white" }}
      axisLine={false}
      tickLine={false}
    />
  );

  const sharedTooltip = (
    <TypedTooltip
      cursor={{ fill: "rgba(122, 143, 204, 0.3)" }}
      content={<CustomTooltip />}
    />
  );

  return (
    <ResponsiveContainer width="100%" height={700}>
      {diagrammType === "Bar" ? (
        <BarChart data={currentData} margin={{ bottom: 20 }}>
          <CartesianGrid vertical={false} stroke={"rgba(255, 255, 255, 0.1)"} />
          {sharedXAxis}
          {sharedYAxis}
          {sharedTooltip}
          {repositoryNames.map((repositoryName, index) => {
            return (
              <Bar
                dataKey={(currentEntry) =>
                  getPriceByRepositoryName(repositoryName, currentEntry.entries)
                }
                stackId="a"
                fill={getColorFromRepositoryName(
                  repositoryName,
                  colorsPerRepositoryName
                )}
                key={index}
                name={repositoryName}
                isAnimationActive={false}
              />
            );
          })}
        </BarChart>
      ) : (
        <LineChart data={currentData} margin={{ bottom: 20 }}>
          <CartesianGrid stroke={"rgba(255, 255, 255, 0.1)"} />
          {sharedXAxis}
          {sharedYAxis}
          {sharedTooltip}
          {repositoryNames.map((repositoryName, index) => {
            return (
              <Line
                type="monotone"
                stroke={getColorFromRepositoryName(
                  repositoryName,
                  colorsPerRepositoryName
                )}
                dataKey={(currentEntry) =>
                  getPriceByRepositoryName(repositoryName, currentEntry.entries)
                }
                key={index}
                name={repositoryName}
                strokeWidth={4}
                dot={false}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};
