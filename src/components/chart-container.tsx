import React, { useContext, useState } from "react";
import { UsageReportEntry } from "../csv-reader";
import { BillingBarChart } from "./billing-bar-chart";
import { BillingLineChart } from "./billing-line-chart";
import "./chart-container.css";
import { WidgetContext } from "./widget-context";
import {
  getMaximumTotalPriceOfAllDays,
  getMaximumTotalPriceOfAllWeeks,
} from "../group-entries";

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
  const currentData = activeMonth.monthName === "" ? csvData : activeMonth.data;

  return (
    <>
      <h2>Angezeigter Zeitraum</h2>
      <p>
        {activeMonth.monthName ||
          `${csvData[0].date} bis ${
            csvData[csvData.length - 1].date
          } (kompletter Datensatz)`}
      </p>
      <div className={"toggle-button-div"}>
        <div>
          <button
            className={`toggle-button left-toggle-button ${
              groupedBy === "daily" ? "selected-button" : null
            }`}
            onClick={() => setGroupedBy("daily")}
          >
            Daily
          </button>
          <button
            className={`toggle-button right-toggle-button ${
              groupedBy === "weekly" ? "selected-button" : null
            }`}
            onClick={() => setGroupedBy("weekly")}
          >
            Weekly
          </button>
        </div>

        <div>
          <button
            className={`toggle-button left-toggle-button ${
              diagramType === "Bar" ? "selected-button" : null
            }`}
            onClick={() => setDiagramType("Bar")}
          >
            Bar
          </button>
          <button
            className={`toggle-button right-toggle-button ${
              diagramType === "Line" ? "selected-button" : null
            }`}
            onClick={() => setDiagramType("Line")}
          >
            Line
          </button>
        </div>
      </div>
      {diagramType === "Bar" ? (
        <BillingBarChart
          maxValueOfYAxis={currentMaxValueOfYAxis}
          csvData={currentData}
          groupedBy={groupedBy}
        />
      ) : (
        <BillingLineChart
          maxValueOfYAxis={currentMaxValueOfYAxis}
          csvData={currentData}
          groupedBy={groupedBy}
        />
      )}
    </>
  );
};
