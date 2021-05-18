import React from "react";
import {UsageReportMonth} from "../group-entries";
import {LineChart, Line} from 'recharts';
import {groupEntriesPerDay} from "../group-entries";

interface MonthlyWidgetProps{
    monthlyEntry: UsageReportMonth
}

const MonthlyWidget = ({monthlyEntry}: MonthlyWidgetProps): JSX.Element => {
    const entriesGroupedPerDay = groupEntriesPerDay(monthlyEntry.entries)
    return(
        <div style={{margin: "10px"}}>
            <div>
                <h4>{monthlyEntry.monthName}</h4>
                <p>{`${Math.round(monthlyEntry.totalPrice * 100) / 100} $`}</p>
            </div>
            <LineChart
                width={100}
                height={50}
                data={entriesGroupedPerDay}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <Line type="monotone" dataKey="totalPrice" stroke="#82ca9d" dot={false} />
            </LineChart>
        </div>
    )
}

export default MonthlyWidget