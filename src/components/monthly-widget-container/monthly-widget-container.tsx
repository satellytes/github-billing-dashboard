import React from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { MonthlyWidget } from "../monthly-widget/monthly-widget";
import {
  getAmountOfDays,
  getMaximumTotalPriceOfAllDays,
  groupEntriesPerMonth,
} from "../../util/group-entries";
import styled from "styled-components";
import { Grid, GridItem } from "../grid/grid";

interface MonthlyWidgetProps {
  csvData: UsageReportEntry[];
}

let averageCostsPerDayOfPreviousMonth = 0;

const StyledContainer = styled(Grid)`
  margin-top: 40px;
`;

const Annotation = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

export const MonthlyWidgetContainer = ({
  csvData,
}: MonthlyWidgetProps): JSX.Element => {
  const maxValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData);
  const entriesGroupedPerMonth = groupEntriesPerMonth(csvData);

  return (
    <GridItem>
      <StyledContainer>
        {entriesGroupedPerMonth.map((monthlyEntry, index) => {
          let isMoreExpensiveThanPreviousMonth = true;
          const isFirstMonth = index == 0;
          const isLastMonth = index == entriesGroupedPerMonth.length - 1;
          const averageCostsPerDay =
            monthlyEntry.totalPrice / getAmountOfDays(monthlyEntry.entries);
          if (
            index === 0 ||
            averageCostsPerDayOfPreviousMonth > averageCostsPerDay
          ) {
            isMoreExpensiveThanPreviousMonth = false;
          }

          const percentageDifferenceToPreviousMonth =
            index === 0 || averageCostsPerDayOfPreviousMonth === 0
              ? 0
              : ((averageCostsPerDay - averageCostsPerDayOfPreviousMonth) /
                  averageCostsPerDayOfPreviousMonth) *
                100;

          averageCostsPerDayOfPreviousMonth = averageCostsPerDay;

          return (
            <MonthlyWidget
              key={monthlyEntry.month}
              monthlyEntry={monthlyEntry}
              maxValueOfYAxis={maxValueOfYAxis}
              isMoreExpensiveThanPreviousMonth={
                isMoreExpensiveThanPreviousMonth
              }
              percentageDifferenceToPreviousMonth={
                percentageDifferenceToPreviousMonth
              }
              isFirstMonth={isFirstMonth}
              isLastMonth={isLastMonth}
            />
          );
        })}
      </StyledContainer>
      <Annotation>¹ Average cost per day compared to previous month</Annotation>
    </GridItem>
  );
};
