import React, { useContext, useState } from "react";
import { UsageReportEntry } from "../../csv-reader";
import { BillingBarChart } from "../billing-chart/billing-bar-chart";
import { BillingLineChart } from "../billing-chart/billing-line-chart";
import { WidgetContext } from "../context/widget-context";
import {
  getMaximumTotalPriceOfAllDays,
  getMaximumTotalPriceOfAllWeeks,
} from "../../group-entries";
import {
  ButtonDiv,
  ChartDiv,
  LeftToggleButton,
  RightToggleButton,
} from "./style";
import { lightFormat } from "date-fns";

interface ChartContainerProps {
  csvData: UsageReportEntry[];
}

export const ChartContainer = ({
  csvData,
}: ChartContainerProps): JSX.Element => {
  const [diagramType, setDiagramType] = useState<"Bar" | "Line">("Bar");
  const [groupedBy, setGroupedBy] = useState<"daily" | "weekly">("daily");

  // Selected month from mini-widgets
  const { activeMonth } = useContext(WidgetContext);

  const maxDailyValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData);
  const maxWeeklyValueOfYAxis = getMaximumTotalPriceOfAllWeeks(csvData);
  const currentMaxValueOfYAxis =
    groupedBy === "daily" ? maxDailyValueOfYAxis : maxWeeklyValueOfYAxis;

  //currentData changes when a mini-widget is selected
  const isDataFromWidget = !(activeMonth.monthName === "");
  const currentData = isDataFromWidget ? activeMonth.data : csvData;

  const repositoryNames = (): string[] => {
    const repositoryNamesWithDuplicates = csvData.map(
      (entry) => entry.repositorySlug
    );
    return repositoryNamesWithDuplicates.filter(
      (value, index) => repositoryNamesWithDuplicates.indexOf(value) === index
    );
  };

  return (
    <>
      <h2>Angezeigter Zeitraum</h2>
      <p>
        {activeMonth.monthName ||
          `${lightFormat(
            new Date(csvData[0].date),
            "dd.MM.yyyy"
          )} bis ${lightFormat(
            new Date(csvData[csvData.length - 1].date),
            "dd.MM.yyyy"
          )}`}
      </p>
      <ChartDiv>
        <ButtonDiv>
          <div>
            <LeftToggleButton
              isActive={groupedBy === "daily"}
              onClick={() => setGroupedBy("daily")}
            >
              Daily
            </LeftToggleButton>
            <RightToggleButton
              isActive={groupedBy === "weekly"}
              onClick={() => setGroupedBy("weekly")}
            >
              Weekly
            </RightToggleButton>
          </div>

          <div>
            <LeftToggleButton
              isActive={diagramType === "Bar"}
              onClick={() => setDiagramType("Bar")}
            >
              Bar
            </LeftToggleButton>
            <RightToggleButton
              isActive={diagramType === "Line"}
              onClick={() => setDiagramType("Line")}
            >
              Line
            </RightToggleButton>
          </div>
        </ButtonDiv>
        {diagramType === "Bar" ? (
          <BillingBarChart
            maxValueOfYAxis={currentMaxValueOfYAxis}
            csvData={currentData}
            groupedBy={groupedBy}
            repositoryNames={repositoryNames()}
            isDataFromWidget={isDataFromWidget}
          />
        ) : (
          <BillingLineChart
            maxValueOfYAxis={currentMaxValueOfYAxis}
            csvData={currentData}
            groupedBy={groupedBy}
            repositoryNames={repositoryNames()}
            isDataFromWidget={isDataFromWidget}
          />
        )}
      </ChartDiv>
    </>
  );
};
