import React, { useContext } from "react";
import { UsageReportMonth } from "../../util/group-entries";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import { groupEntriesPerDay } from "../../util/group-entries";
import { WidgetContext } from "../context/widget-context";
import styled from "styled-components";
import { GridItem } from "../grid/grid";
import { lightFormat } from "date-fns";

interface MonthlyWidgetProps {
  monthlyEntry: UsageReportMonth;
  maxValueOfYAxis: number;
  isMoreExpensiveThanPreviousMonth: boolean;
  percentageDifferenceToPreviousMonth: number;
  isFirstMonth: boolean;
  isLastMonth: boolean;
}

const StyledWidget = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  background: rgba(122, 143, 204, 0.3);
  padding: 16px;
  border: ${(props: { isActive: boolean }) =>
    props.isActive ? "1px solid white" : "1px solid rgba(122, 143, 204, 0.3)"};

  border-radius: 4px;

  &:hover {
    border-color: white;
  }
`;

const WidgetMainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WidgetDescription = styled.div``;

const WidgetMonth = styled.h2`
  margin-bottom: 8px;
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
`;

const WidgetValue = styled.p`
  font-style: normal;
  font-weight: normal;
  margin-top: 8px;
  margin-bottom: 0;
  font-size: ${(props: { fontSize: number }) => `${props.fontSize}px`};
`;

const Arrow = styled.span`
  color: ${(props: { isMoreExpensiveThanPreviousMonth: boolean }) =>
    props.isMoreExpensiveThanPreviousMonth ? "#DC052D" : "#75F0C7"};
`;

export const MonthlyWidget = ({
  monthlyEntry,
  maxValueOfYAxis,
  isMoreExpensiveThanPreviousMonth,
  percentageDifferenceToPreviousMonth,
  isLastMonth,
  isFirstMonth,
}: MonthlyWidgetProps): JSX.Element => {
  const { activeMonth, setActiveMonth } = useContext(WidgetContext);
  const entriesGroupedPerDay = groupEntriesPerDay(monthlyEntry.entries);
  const formattedDifferenceToPreviousMonth = `${
    percentageDifferenceToPreviousMonth >= 0 ? "+" : ""
  }${Math.round(percentageDifferenceToPreviousMonth * 100) / 100}%`;
  //"\u2191" = Arrow-Up-Symbol, "\u2193" = Arrow-Down-Symbol
  const arrowSymbol = isMoreExpensiveThanPreviousMonth ? " \u2191" : " \u2193";
  const firstDayOfMonth = monthlyEntry.entries[0].date;
  const lastDayOfMonth =
    monthlyEntry.entries[monthlyEntry.entries.length - 1].date;
  const tooltipValue = `${
    Math.round(percentageDifferenceToPreviousMonth * 100) / 100
  } % ${isMoreExpensiveThanPreviousMonth ? "mehr" : "weniger"} als im Vormonat`;

  return (
    <GridItem sm={6} md={4} lg={3}>
      <StyledWidget
        isActive={activeMonth.monthName === monthlyEntry.monthName}
        onClick={() =>
          setActiveMonth(monthlyEntry.monthName, monthlyEntry.entries)
        }
      >
        <WidgetMonth>
          {monthlyEntry.monthName}
          {isFirstMonth
            ? ` (from ${lightFormat(new Date(firstDayOfMonth), "dd.MM.")})`
            : ""}
          {isLastMonth
            ? ` (till ${lightFormat(new Date(lastDayOfMonth), "dd.MM.")})`
            : ""}
        </WidgetMonth>
        <WidgetMainContent>
          <WidgetDescription>
            <WidgetValue fontSize={14}>{`${
              Math.round(monthlyEntry.totalPrice * 100) / 100
            } $`}</WidgetValue>
            {!isFirstMonth && (
              <WidgetValue title={tooltipValue} fontSize={12}>
                {formattedDifferenceToPreviousMonth} ¹
                <Arrow
                  isMoreExpensiveThanPreviousMonth={
                    isMoreExpensiveThanPreviousMonth
                  }
                >
                  {arrowSymbol}
                </Arrow>
              </WidgetValue>
            )}
          </WidgetDescription>
          <ResponsiveContainer width="55%" height={50}>
            <LineChart
              data={entriesGroupedPerDay}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              cursor="pointer"
            >
              <YAxis hide={true} domain={[0, maxValueOfYAxis]} />
              <Line
                type="monotone"
                dataKey="totalPrice"
                stroke={
                  isMoreExpensiveThanPreviousMonth ? "#DC052D" : "#75F0C7"
                }
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </WidgetMainContent>
      </StyledWidget>
    </GridItem>
  );
};
