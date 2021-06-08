import React from "react";
import { MonthlyWidgetContainer } from "../components/monthly-widget-container/monthly-widget-container";
import { ChartContainer } from "../components/chart-container/chart-container";
import { UsageReportEntry } from "../util/csv-reader";
import styled from "styled-components";

interface RunningApplicationProps {
  csvData: UsageReportEntry[];
}

const ApplicationDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  grid-column: 1/9;
  margin: 40px 0 0 0;
`;

export const RunningApplication = ({
  csvData,
}: RunningApplicationProps): JSX.Element => {
  return (
    <>
      <ApplicationDescription>
        Kuzre Einführungstext Integer posuere erat a ante venenatis dapibus
        posuere velit aliquet. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet
        non magna.
      </ApplicationDescription>
      {csvData && <MonthlyWidgetContainer csvData={csvData} />}
      {csvData && <ChartContainer csvData={csvData} />}
    </>
  );
};
