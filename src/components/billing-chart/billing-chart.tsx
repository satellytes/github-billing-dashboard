import React, { useEffect, useState } from "react";
import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
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

const removeZeroDollarEntries = (
  value: number,
  name: string,
  props: { value: number }
): [string | null, string | null, { value: number } | null] => {
  if (props.value === 0) {
    return [null, null, null];
  } else {
    return [`${value}$`, name, props];
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
  const [activeRepository, setActiveRepository] = useState("");
  const [currentData, setCurrentData] =
    useState<UsageReportDay[] | UsageReportWeek[]>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setActiveRepository("");
    if (groupedBy === "daily") {
      setCurrentData(entriesGroupedPerDay);
    } else {
      setCurrentData(entriesGroupedPerWeek);
    }
    setTimeout(() => {
      setLoaded(true);
    }, 0);
  }, [entriesGroupedPerDay, entriesGroupedPerWeek]);

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
  }, [activeRepository]);

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
      formatter={(value: number, name: string, props: { value: number }) =>
        removeZeroDollarEntries(value, name, props)
      }
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
  const sharedLegend = (
    <Legend
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      onClick={(repository: any) => {
        activeRepository
          ? setActiveRepository("")
          : setActiveRepository(repository.value);
      }}
    />
  );

  return (
    <>
      {loaded && (
        <ResponsiveContainer width="100%" height={700}>
          {diagrammType === "Bar" ? (
            <BarChart data={currentData}>
              <CartesianGrid
                vertical={false}
                stroke={"rgba(255, 255, 255, 0.1)"}
              />
              {sharedXAxis}
              {sharedYAxis}
              {sharedTooltip}
              {sharedLegend}
              {repositoryNames.map((repositoryName, index) => {
                return (
                  <Bar
                    dataKey={(currentEntry) =>
                      getPriceByRepositoryName(
                        repositoryName,
                        currentEntry.entries
                      )
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
              {sharedLegend}
              {repositoryNames.map((repositoryName, index) => {
                return (
                  <Line
                    type="monotone"
                    stroke={
                      activeRepository === repositoryName
                        ? "white"
                        : colors[index]
                    }
                    dataKey={(currentEntry) =>
                      getPriceByRepositoryName(
                        repositoryName,
                        currentEntry.entries
                      )
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
      )}
    </>
  );
};
