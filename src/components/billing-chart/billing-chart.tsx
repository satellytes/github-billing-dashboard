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
} from "recharts";
import {
  filterEntriesByRepositoryName,
  getPriceByRepositoryName,
  UsageReportDay,
  UsageReportWeek,
} from "../../util/group-entries";
import { getDay, lightFormat } from "date-fns";
import { dayOfWeek, isStringDateValue } from "../../util/date-util";
import { UsageReportEntry } from "../../util/csv-reader";
import { RepositoryTableContext } from "../context/repository-table-context";

const removeZeroDollarEntries = (
  value: number,
  name: string,
  props: { value: number; payload: { entries: UsageReportEntry[] } },
  firstRepository: string
): [string | null, string | null, { value: number } | null] => {
  //TODO: fix bug: "no expenses, yeah" doesn't show up sometimes
  if (props.value === 0) {
    if (props.payload.entries.length === 0 && name === firstRepository) {
      return ["no expenses, yeah", null, null];
    }
    return [null, null, null];
  } else {
    return [`${value} $`, name, props];
  }
};

//Setting the generics for Tooltip
class CustomTooltip extends Tooltip<number, string> {}

const colors = [
  "#233666",
  "#96ADEA",
  "#4F79E6",
  "#414C66",
  "#3D5EB3",
  "#233666",
  "#96ADEA",
  "#4F79E6",
  "#414C66",
  "#3D5EB3",
];

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
    <CustomTooltip
      formatter={(
        value: number,
        name: string,
        props: { value: number; payload: { entries: UsageReportEntry[] } }
      ) => removeZeroDollarEntries(value, name, props, repositoryNames[0])}
      labelFormatter={(label) =>
        isStringDateValue(label)
          ? `${dayOfWeek[getDay(new Date(label))]}, ${lightFormat(
              new Date(label),
              "dd.MM."
            )}`
          : label
      }
      itemSorter={(repositoryGroupedByDay) =>
        repositoryGroupedByDay.value ? repositoryGroupedByDay.value * -1 : 0
      }
      labelStyle={{
        color: "black",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "13px",
        marginBottom: "10px",
      }}
      itemStyle={{
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "13px",
        marginBottom: "4px",
        padding: 0,
      }}
      contentStyle={{
        borderRadius: "4px",
        borderBlockColor: "white",
        padding: "12px",
      }}
      cursor={{ fill: "rgba(122, 143, 204, 0.3)" }}
    />
  );

  return (
    <ResponsiveContainer width="100%" height={700}>
      {diagrammType === "Bar" ? (
        <BarChart data={currentData}>
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
                fill={colors[index]}
                key={index}
                name={repositoryName}
              />
            );
          })}
        </BarChart>
      ) : (
        <LineChart data={currentData}>
          <CartesianGrid stroke={"rgba(255, 255, 255, 0.1)"} />
          {sharedXAxis}
          {sharedYAxis}
          {sharedTooltip}
          {repositoryNames.map((repositoryName, index) => {
            return (
              <Line
                type="monotone"
                stroke={colors[index]}
                dataKey={(currentEntry) =>
                  getPriceByRepositoryName(repositoryName, currentEntry.entries)
                }
                key={index}
                name={repositoryName}
                strokeWidth={4}
                dot={false}
              />
            );
          })}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};
