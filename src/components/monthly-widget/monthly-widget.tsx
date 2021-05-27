import React, { useContext } from "react";
import { UsageReportMonth } from "../../group-entries";
import { LineChart, Line, YAxis } from "recharts";
import { groupEntriesPerDay } from "../../group-entries";
import { WidgetContext } from "../context/widget-context";
import {
  Arrow,
  StyledWidget,
  WidgetDescription,
  WidgetMonth,
  WidgetValue,
} from "./style";

interface MonthlyWidgetProps {
  monthlyEntry: UsageReportMonth;
  maxValueOfYAxis: number;
  isMoreExpensiveThanPreviousMonth: boolean;
  differenceToPreviousMonth: number;
}

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
