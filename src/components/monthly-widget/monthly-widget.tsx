import React, { useContext } from "react";
import { UsageReportDay, UsageReportMonth } from "../../util/group-entries";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import { WidgetContext } from "../context/widget-context";
import styled from "styled-components";
import { GridItem, up } from "../grid/grid";
import { lightFormat } from "date-fns";
import ArrowUp from "../../assets/arrow-up-icon.svg";
import ArrowDown from "../../assets/arrow-down-icon.svg";

interface MonthlyWidgetProps {
  monthlyEntry: UsageReportMonth;
  maxValueOfYAxis: number;
  isMoreExpensiveThanPreviousMonth: boolean;
  percentageDifferenceToPreviousMonth: number;
  isFirstMonth: boolean;
  isLastMonth: boolean;
  entriesGroupedPerDay: UsageReportDay[];
}

const StyledWidget = styled.div`
  margin-bottom: 24px;
  cursor: pointer;
  background: ${(props: { isActive: boolean }) =>
    props.isActive ? "rgba(122, 143, 204, 0.3)" : "rgba(122, 143, 204, 0.15)"};
  padding: 16px;
  border: none;
  box-shadow: ${(props: { isActive: boolean }) =>
    props.isActive ? "inset 0px -3px 0px #668CFF" : "none"};

  border-radius: 4px;

  &:hover {
    background: rgba(122, 143, 204, 0.3);
  }

  ${`${up("sm")}{
  margin-right: 24px;
   }`}
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

const Arrow = styled.img`
  width: 14px;
  margin-bottom: -3px;
  margin-left: 6px;
`;

export const MonthlyWidget = ({
  monthlyEntry,
  maxValueOfYAxis,
  isMoreExpensiveThanPreviousMonth,
  percentageDifferenceToPreviousMonth,
  isLastMonth,
  isFirstMonth,
  entriesGroupedPerDay,
}: MonthlyWidgetProps): JSX.Element => {
  const { activeMonth, setActiveMonth } = useContext(WidgetContext);
  const formattedDifferenceToPreviousMonth = `${
    percentageDifferenceToPreviousMonth >= 0 ? "+" : ""
  }${Math.round(percentageDifferenceToPreviousMonth * 100) / 100}%`;
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
                  src={isMoreExpensiveThanPreviousMonth ? ArrowUp : ArrowDown}
                ></Arrow>
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
