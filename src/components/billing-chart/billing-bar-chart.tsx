import React from "react";
import { UsageReportEntry } from "../../csv-reader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  groupEntriesPerDay,
  groupEntriesPerWeek,
  getPriceByRepositoryName,
} from "../../group-entries";
import { lightFormat } from "date-fns";
import "react-dropdown/style.css";

interface BillingChartProps {
  csvData: UsageReportEntry[];
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
  repositoryNames: string[];
}

export const BillingBarChart = ({
  csvData,
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
}: BillingChartProps): JSX.Element => {
  const entriesGroupedPerDay = groupEntriesPerDay(csvData);
  const entriesGroupedPerWeek = groupEntriesPerWeek(csvData);

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

  class CustomTooltip extends Tooltip<number, string> {}

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        data={
          groupedBy === "daily" ? entriesGroupedPerDay : entriesGroupedPerWeek
        }
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey={groupedBy === "daily" ? "day" : "week"}
          tickFormatter={(tick) =>
            Date.parse(tick) ? lightFormat(new Date(tick), "dd.MM.") : tick
          }
          interval="preserveStart"
        />
        <YAxis domain={[0, maxValueOfYAxis]} unit=" $" />
        {/*labelFormatter checks if the given label has the right format*/}
        <CustomTooltip
          labelFormatter={(label) =>
            Date.parse(label) ? lightFormat(new Date(label), "dd.MM.") : label
          }
          itemSorter={(item) => (item.value ? item.value * -1 : 0)}
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
