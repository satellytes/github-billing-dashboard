import React, { useState } from "react";
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
} from "../../util/group-entries";
import { lightFormat } from "date-fns";
import {
  BillingChartProps,
  colors,
  CustomTooltip,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "./billing-chart-components";
import { isStringDateValue } from "../../util/date-util";

export const BillingBarChart = ({
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  entriesGroupedPerDay,
  entriesGroupedPerWeek,
}: BillingChartProps): JSX.Element => {
  const [activeRepository, setActiveRepository] = useState("");
  const entriesOfOneRepositoryGroupedPerDay = filterEntriesByRepositoryName(
    entriesGroupedPerDay,
    activeRepository
  );
  const entriesOfOneRepositoryGroupedPerWeek = filterEntriesByRepositoryName(
    entriesGroupedPerWeek,
    activeRepository
  );
  const currentData = () => {
    if (groupedBy === "daily") {
      return activeRepository === ""
        ? entriesGroupedPerDay
        : entriesOfOneRepositoryGroupedPerDay;
    } else {
      return activeRepository === ""
        ? entriesGroupedPerWeek
        : entriesOfOneRepositoryGroupedPerWeek;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={currentData()}>
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
        {/*TODO: Remove any*/}
        <Legend
          onMouseEnter={(repository: any) => {
            console.log(repository);
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
              unit={"$"}
            />
          );
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};
