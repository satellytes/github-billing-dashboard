import React from "react";
import {UsageReportEntry} from "../csv-reader";
import {MonthlyWidget} from "./monthly-widget";
import {getMaximumTotalPriceOfAllDays, groupEntriesPerMonth} from "../group-entries";

interface MonthlyWidgetProps{
    csvData: UsageReportEntry[]
}

export const MonthlyWidgetContainer = ({csvData}: MonthlyWidgetProps): JSX.Element => {
    const maxValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData)
    const entriesGroupedPerMonth = groupEntriesPerMonth(csvData)
    return(
        <div style={{display: "flex"}}>
            {entriesGroupedPerMonth.map((monthlyEntry) => <MonthlyWidget key={monthlyEntry.month} monthlyEntry={monthlyEntry} maxValueOfYAxis={maxValueOfYAxis}/>)}
        </div>
    )
}
