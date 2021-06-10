import React from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { MonthlyWidget } from "../monthly-widget/monthly-widget";
import {
  getMaximumTotalPriceOfAllDays,
  groupEntriesPerMonth,
} from "../../util/group-entries";
import styled from "styled-components";
import { Grid } from "../grid/grid";

interface MonthlyWidgetProps {
  csvData: UsageReportEntry[];
}

let totalPriceOfPreviousMonth = 0;

const StyledContainer = styled(Grid)`
  margin: 40px 0 0 0;
  grid-column-start: span 12;
`;

export const MonthlyWidgetContainer = ({
  csvData,
}: MonthlyWidgetProps): JSX.Element => {
  const maxValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData);
  const entriesGroupedPerMonth = groupEntriesPerMonth(csvData);

  return (
    <StyledContainer>
      {entriesGroupedPerMonth.map((monthlyEntry, index) => {
        let isMoreExpensiveThanPreviousMonth = true;
        if (
          index === 0 ||
          totalPriceOfPreviousMonth > monthlyEntry.totalPrice
        ) {
          isMoreExpensiveThanPreviousMonth = false;
        }

        const differenceToPreviousMonth =
          index === 0 ? 0 : monthlyEntry.totalPrice - totalPriceOfPreviousMonth;
        totalPriceOfPreviousMonth = monthlyEntry.totalPrice;

        return (
          <MonthlyWidget
            key={monthlyEntry.month}
            monthlyEntry={monthlyEntry}
            maxValueOfYAxis={maxValueOfYAxis}
            isMoreExpensiveThanPreviousMonth={isMoreExpensiveThanPreviousMonth}
            differenceToPreviousMonth={differenceToPreviousMonth}
          />
        );
      })}
    </StyledContainer>
  );
};
