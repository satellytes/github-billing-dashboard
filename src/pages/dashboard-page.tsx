import React from "react";
import { MonthlyWidgetContainer } from "../components/monthly-widget-container/monthly-widget-container";
import { ChartContainer } from "../components/billing-chart/chart-container";
import { UsageReportEntry } from "../util/csv-reader";
import { RepositoryTable } from "../components/repository-table/repository-table";
import { CurrentTimePeriode } from "../components/headlines/current-time-periode";

interface RunningApplicationProps {
  csvData: UsageReportEntry[];
}

export const DashboardPage = ({
  csvData,
}: RunningApplicationProps): JSX.Element => {
  return (
    <>
      {csvData && <CurrentTimePeriode csvData={csvData} />}
      {csvData && <RepositoryTable csvData={csvData} />}
      {csvData && <MonthlyWidgetContainer csvData={csvData} />}
      {csvData && <ChartContainer csvData={csvData} />}
    </>
  );
};
