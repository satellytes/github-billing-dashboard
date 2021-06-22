import React, { useContext } from "react";
import { getPeriodOfTimeString } from "../../util/date-util";
import styled from "styled-components";
import { UsageReportEntry } from "../../util/csv-reader";
import { WidgetContext } from "../context/widget-context";
import { GridItem } from "../grid/grid";

interface CurrentTimePeriodeProps {
  csvData: UsageReportEntry[];
}

const ChartHeadline = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 42px;
  margin-top: 80px;
`;

const ChartDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin-top: 16px;
`;

export const CurrentTimePeriode = ({
  csvData,
}: CurrentTimePeriodeProps): JSX.Element => {
  const { activeMonth } = useContext(WidgetContext);
  return (
    <GridItem>
      <ChartHeadline>Overview</ChartHeadline>
      <ChartDescription>
        {activeMonth.monthName || getPeriodOfTimeString(csvData)}
      </ChartDescription>
    </GridItem>
  );
};
