import React from "react";
import { UsageReportEntry } from "../../csv-reader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  groupEntriesPerDay,
  groupEntriesPerWeek,
  getPriceByRepositoryName,
} from "../../group-entries";
import "react-dropdown/style.css";
import { lightFormat } from "date-fns";

interface BillingLineChartProps {
  csvData: UsageReportEntry[];
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
  repositoryNames: string[];
  isDataFromWidget: boolean;
}

export const BillingLineChart = ({
  csvData,
  groupedBy,
  maxValueOfYAxis,
  repositoryNames,
  isDataFromWidget,
}: BillingLineChartProps): JSX.Element => {
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

  //Setting the generics for Tooltip
  class CustomTooltip extends Tooltip<number, string> {}

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={
          groupedBy === "daily" ? entriesGroupedPerDay : entriesGroupedPerWeek
        }
      >
        <CartesianGrid />
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
