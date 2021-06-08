import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getPriceByRepositoryName } from "../../group-entries";
import { lightFormat } from "date-fns";
import {
  BillingChartProps,
  colors,
  CustomTooltip,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "./billing-chart-components";
import { isStringDateValue } from "../../date-util";

export const BillingBarChart = ({
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  entriesGroupedPerDay,
  entriesGroupedPerWeek,
}: BillingChartProps): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={
          groupedBy === "daily" ? entriesGroupedPerDay : entriesGroupedPerWeek
        }
      >
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
          interval="preserveStart"
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
          labelFormatter={(label) =>
            isStringDateValue(label)
              ? lightFormat(new Date(label), "dd.MM.")
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
        <Legend />
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
              unit={"$"}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};
