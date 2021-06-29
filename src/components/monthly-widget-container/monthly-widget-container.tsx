import React from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { MonthlyWidget } from "../monthly-widget/monthly-widget";
import {
  getAmountOfDays,
  getMaximumTotalPriceOfAllDays,
  groupDailyEntriesPerMonth,
  groupEntriesPerMonth,
  UsageReportDay,
} from "../../util/group-entries";
import styled from "styled-components";
import { Grid, GridItem } from "../grid/grid";
import { getMonth } from "date-fns";

interface MonthlyWidgetProps {
  csvData: UsageReportEntry[];
  entriesGroupedPerDay: UsageReportDay[];
}

let averageCostsPerDayOfPreviousMonth = 0;

const StyledContainer = styled(Grid)`
  grid-auto-rows: 1fr;
`;

const Annotation = styled.p`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

export const MonthlyWidgetContainer = ({
  csvData,
  entriesGroupedPerDay,
}: MonthlyWidgetProps): JSX.Element => {
  const maxValueOfYAxis = getMaximumTotalPriceOfAllDays(entriesGroupedPerDay);
  const usageReportMonthEntries = groupEntriesPerMonth(csvData);
  const dailyEntriesGroupedPerMonth =
    groupDailyEntriesPerMonth(entriesGroupedPerDay);
  const getPercentageDifference = (value1: number, value2: number) =>
    value1 !== 0 ? ((value2 - value1) / value1) * 100 : 0;

  return (
    <GridItem>
      <StyledContainer>
        {usageReportMonthEntries.map((monthlyEntry, index) => {
          const numberOfActiveMonth = getMonth(
            new Date(monthlyEntry.entries[0].date)
          );
          let dailyEntriesOfActiveMonth: UsageReportDay[] = [];
          dailyEntriesGroupedPerMonth.forEach((month) => {
            if (month.month === numberOfActiveMonth) {
              dailyEntriesOfActiveMonth = month.entries;
            }
          });

          let isMoreExpensiveThanPreviousMonth = true;
          const isFirstMonth = index == 0;
          const isLastMonth = index == usageReportMonthEntries.length - 1;
          const averageCostsPerDay =
            monthlyEntry.totalPrice /
            getAmountOfDays(dailyEntriesOfActiveMonth);
          if (
            index === 0 ||
            averageCostsPerDayOfPreviousMonth > averageCostsPerDay
          ) {
            isMoreExpensiveThanPreviousMonth = false;
          }
          const percentageDifferenceToPreviousMonth =
            index === 0
              ? 0
              : getPercentageDifference(
                  averageCostsPerDayOfPreviousMonth,
                  averageCostsPerDay
                );
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
              entriesGroupedPerDay={dailyEntriesOfActiveMonth}
            />
          );
        })}
      </StyledContainer>
      <Annotation>¹ average cost per day compared to previous month</Annotation>
    </GridItem>
  );
};
