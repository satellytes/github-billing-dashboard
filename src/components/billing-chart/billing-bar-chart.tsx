import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  filterEntriesByRepositoryName,
  getPriceByRepositoryName,
  UsageReportDay,
  UsageReportWeek,
} from "../../util/group-entries";
import { getDay, lightFormat } from "date-fns";
import {
  BillingChartProps,
  colors,
  CustomTooltip,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "./billing-chart-components";
import { dayOfWeek, isStringDateValue } from "../../util/date-util";

export const BillingBarChart = ({
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  entriesGroupedPerDay,
  entriesGroupedPerWeek,
}: BillingChartProps): JSX.Element => {
  const [activeRepository, setActiveRepository] = useState("");
  const [currentData, setCurrentData] =
    useState<UsageReportDay[] | UsageReportWeek[]>();

  useEffect(() => {
    if (groupedBy === "daily") {
      activeRepository === ""
        ? setCurrentData(entriesGroupedPerDay)
        : setCurrentData(
            filterEntriesByRepositoryName(
              entriesGroupedPerDay,
              activeRepository
            )
          );
    } else {
      activeRepository === ""
        ? setCurrentData(entriesGroupedPerWeek)
        : setCurrentData(
            filterEntriesByRepositoryName(
              entriesGroupedPerWeek,
              activeRepository
            )
          );
    }
  }, [activeRepository, entriesGroupedPerDay, entriesGroupedPerWeek]);

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={currentData}>
        <CartesianGrid vertical={false} stroke={"rgba(255, 255, 255, 0.1)"} />
        <XAxis
          dataKey={groupedBy === "daily" ? "day" : "week"}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "white" }}
          tickFormatter={(tick) =>
            isStringDateValue(tick)
              ? lightFormat(new Date(tick), "dd.MM.")
              : tick
          }
          minTickGap={10}
        />
        <YAxis
          domain={[0, maxValueOfYAxis]}
          unit=" $"
          tickCount={maxValueOfYAxis + 1}
          tick={{ fill: "white" }}
          axisLine={false}
          tickLine={false}
        />

        <CustomTooltip
          //formatter removes repos with 0$ value
          formatter={(
            value: number,
            name: string,
            props: { value: number }
          ) => {
            if (props.value === 0) {
              return [null, null, null];
            } else {
              return [`${value}$`, name, props];
            }
          }}
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
          labelStyle={tooltipLabelStyle}
          itemStyle={tooltipItemStyle}
          contentStyle={tooltipContentStyle}
          cursor={{ fill: "rgba(122, 143, 204, 0.3)" }}
        />
        <Legend
          onMouseEnter={(repository: any) => {
            setActiveRepository(repository.value);
          }}
          onMouseLeave={() => setActiveRepository("")}
        />
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
    </ResponsiveContainer>
  );
};
