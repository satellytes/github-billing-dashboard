import React from "react";
import { MonthlyWidgetContainer } from "../components/monthly-widget-container/monthly-widget-container";
import { ChartContainer } from "../components/chart-container/chart-container";
import { UsageReportEntry } from "../util/csv-reader";
import { RepositoryTable } from "../components/repository-table/repository-table";

interface RunningApplicationProps {
  csvData: UsageReportEntry[];
}

export const DashboardPage = ({
  csvData,
}: RunningApplicationProps): JSX.Element => {
  return (
    <>
      {csvData && <MonthlyWidgetContainer csvData={csvData} />}
      {csvData && <RepositoryTable csvData={csvData} />}
      {csvData && <ChartContainer csvData={csvData} />}
    </>
  );
};
