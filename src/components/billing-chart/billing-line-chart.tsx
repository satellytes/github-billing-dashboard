import React from "react";
import {
  BillingChartProps,
  colors,
  CustomTooltip,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "./billing-chart-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getPriceByRepositoryName } from "../../group-entries";
import { lightFormat } from "date-fns";
import { isStringDateValue } from "../../date-util";

export const BillingLineChart = ({
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  isDataFromWidget,
  entriesGroupedPerDay,
  entriesGroupedPerWeek,
}: BillingChartProps): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={
          groupedBy === "daily" ? entriesGroupedPerDay : entriesGroupedPerWeek
        }
      >
        <CartesianGrid stroke={"rgba(255, 255, 255, 0.1)"} />
        <XAxis
          dataKey={groupedBy === "daily" ? "day" : "week"}
          tick={{ fill: "white" }}
          axisLine={false}
          tickLine={false}
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
        />
        <Legend />
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
              unit={"$"}
              strokeWidth={4}
              dot={false}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
