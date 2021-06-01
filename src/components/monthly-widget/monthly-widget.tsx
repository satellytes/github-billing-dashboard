import React, { useContext } from "react";
import { UsageReportMonth } from "../../group-entries";
import { LineChart, Line, YAxis } from "recharts";
import { groupEntriesPerDay } from "../../group-entries";
import { WidgetContext } from "../context/widget-context";
import styled from "styled-components";

interface MonthlyWidgetProps {
  monthlyEntry: UsageReportMonth;
  maxValueOfYAxis: number;
  isMoreExpensiveThanPreviousMonth: boolean;
  differenceToPreviousMonth: number;
}

const StyledWidget = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  cursor: pointer;
  background: rgba(122, 143, 204, 0.3);
  min-width: 220px;
  border: ${(props: { isActive: boolean }) =>
    props.isActive ? "1px solid white" : "1px solid rgba(122, 143, 204, 0.3)"};
  padding: 8px 4px;
  border-radius: 4px;

  &:hover {
    border-color: white;
  }

  @media (max-width: 576px) {
    margin-bottom: 4px;
  }
`;

const WidgetDescription = styled.div`
  margin-right: 8px;
`;

const WidgetMonth = styled.h2`
  margin-top: 0;
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 150%;
  text-transform: uppercase;
`;

const WidgetValue = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
  text-transform: uppercase;
`;

const Arrow = styled.span`
  color: ${(props: { isMoreExpensiveThanPreviousMonth: boolean }) =>
    props.isMoreExpensiveThanPreviousMonth ? "#DC052D" : "#75F0C7"};
`;

export const MonthlyWidget = ({
  monthlyEntry,
  maxValueOfYAxis,
  isMoreExpensiveThanPreviousMonth,
  differenceToPreviousMonth,
}: MonthlyWidgetProps): JSX.Element => {
  const { activeMonth, setActiveMonth } = useContext(WidgetContext);
  const entriesGroupedPerDay = groupEntriesPerDay(monthlyEntry.entries);
  const formattedDifferenceToPreviousMonth = `${
    differenceToPreviousMonth >= 0 ? "+" : ""
  }${Math.round(differenceToPreviousMonth * 100) / 100} $`;
  //"\u2191" = Arrow-Up-Symbol, "\u2193" = Arrow-Down-Symbol
  const arrowSymbol = isMoreExpensiveThanPreviousMonth ? " \u2191" : " \u2193";

  return (
    <StyledWidget
      isActive={activeMonth.monthName === monthlyEntry.monthName}
      onClick={() =>
        setActiveMonth(monthlyEntry.monthName, monthlyEntry.entries)
      }
    >
      <WidgetDescription>
        <WidgetMonth>{monthlyEntry.monthName}</WidgetMonth>
        <WidgetValue>{`${
          Math.round(monthlyEntry.totalPrice * 100) / 100
        } $`}</WidgetValue>
        <WidgetValue>
          {formattedDifferenceToPreviousMonth}
          <Arrow
            isMoreExpensiveThanPreviousMonth={isMoreExpensiveThanPreviousMonth}
          >
            {arrowSymbol}
          </Arrow>
        </WidgetValue>
      </WidgetDescription>
      <LineChart
        width={100}
        height={50}
        data={entriesGroupedPerDay}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        cursor="pointer"
      >
        <YAxis hide={true} domain={[0, maxValueOfYAxis]} />
        <Line
          type="monotone"
          dataKey="totalPrice"
          stroke={isMoreExpensiveThanPreviousMonth ? "#DC052D" : "#75F0C7"}
          dot={false}
        />
      </LineChart>
    </StyledWidget>
  );
};
