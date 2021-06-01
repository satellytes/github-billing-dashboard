import React from "react";
import { UsageReportEntry } from "../../csv-reader";
import { MonthlyWidget } from "../monthly-widget/monthly-widget";
import {
  getMaximumTotalPriceOfAllDays,
  groupEntriesPerMonth,
} from "../../group-entries";
import styled from "styled-components";

interface MonthlyWidgetProps {
  csvData: UsageReportEntry[];
}

let totalPriceOfPreviousMonth = 0;

const StyledContainer = styled.div`
  display: flex;
  margin-bottom: 96px;
  overflow: auto;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const MonthlyWidgetContainer = ({
  csvData,
}: MonthlyWidgetProps): JSX.Element => {
  const maxValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData);
  const entriesGroupedPerMonth = groupEntriesPerMonth(csvData);

  return (
    <StyledContainer className={"widget-container"}>
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
