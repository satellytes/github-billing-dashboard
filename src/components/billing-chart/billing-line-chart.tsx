import React from "react";
import {
  BillingChartProps,
  colors,
  CustomTooltip,
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
import {
  groupEntriesPerDay,
  groupEntriesPerWeek,
  getPriceByRepositoryName,
} from "../../group-entries";
import { lightFormat } from "date-fns";

export const BillingLineChart = ({
  csvData,
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  isDataFromWidget,
}: BillingChartProps): JSX.Element => {
  const entriesGroupedPerDay = groupEntriesPerDay(csvData);
  const entriesGroupedPerWeek = groupEntriesPerWeek(csvData);

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
            Date.parse(tick) ? lightFormat(new Date(tick), "dd.MM.") : tick
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
        {/*labelFormatter checks if the given label has the right format*/}
        <CustomTooltip
          labelFormatter={(label) =>
            Date.parse(label) ? lightFormat(new Date(label), "dd.MM.") : label
          }
          itemSorter={(repositoryGroupedByDay) =>
            repositoryGroupedByDay.value ? repositoryGroupedByDay.value * -1 : 0
          }
          labelStyle={{
            color: "black",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "110%",
            marginBottom: "4px",
          }}
          itemStyle={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "12px",
            lineHeight: "110%",
          }}
          contentStyle={{ borderRadius: "4px", borderBlockColor: "white" }}
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
