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
import {
  groupEntriesPerDay,
  groupEntriesPerWeek,
  getPriceByRepositoryName,
} from "../../group-entries";
import { lightFormat } from "date-fns";
import {
  BillingChartProps,
  colors,
  CustomTooltip,
} from "./billing-chart-components";

export const BillingBarChart = ({
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
          itemSorter={(repository) =>
            repository.value ? repository.value * -1 : 0
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
