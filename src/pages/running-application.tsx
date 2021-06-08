import React from "react";
import { MonthlyWidgetContainer } from "../components/monthly-widget-container/monthly-widget-container";
import { ChartContainer } from "../components/chart-container/chart-container";
import { UsageReportEntry } from "../csv-reader";

interface RunningApplicationProps {
  csvData: UsageReportEntry[];
}

export const RunningApplication = ({
  csvData,
}: RunningApplicationProps): JSX.Element => {
  return (
    <>
      {csvData && <MonthlyWidgetContainer csvData={csvData} />}
      {csvData && <ChartContainer csvData={csvData} />}
    </>
  );
};
