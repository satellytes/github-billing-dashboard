import React, { useState } from "react";
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
import { getPriceByRepositoryName } from "../../util/group-entries";
import { lightFormat } from "date-fns";
import { isStringDateValue } from "../../util/date-util";

export const BillingLineChart = ({
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  entriesGroupedPerDay,
  entriesGroupedPerWeek,
}: BillingChartProps): JSX.Element => {
  const [activeRepository, setActiveRepository] = useState("");
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
        {/*TODO: Remove any*/}
        <Legend
          onMouseEnter={(repository: any) =>
            setActiveRepository(repository.value)
          }
          onMouseLeave={() => setActiveRepository("")}
        />
        {repositoryNames.map((repositoryName, index) => {
          return (
            <Line
              type="monotone"
              stroke={
                activeRepository === repositoryName ? "white" : colors[index]
              }
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
    </ResponsiveContainer>
  );
};
