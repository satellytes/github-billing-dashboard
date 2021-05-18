import React from "react";
import {UsageReportEntry} from "../csv-reader";
import MonthlyWidget from "./monthly-widget";
import {groupEntriesPerMonth} from "../group-entries";

interface MonthlyWidgetProps{
    csvData: UsageReportEntry[]
}

const MonthlyWidgetContainer = ({csvData}: MonthlyWidgetProps): JSX.Element => {
    const entriesGroupedPerMonth = groupEntriesPerMonth(csvData)
    return(
        <div style={{display: "flex"}}>
            {entriesGroupedPerMonth.map((monthlyEntry) => <MonthlyWidget key={monthlyEntry.month} monthlyEntry={monthlyEntry}/>)}
        </div>
    )
}

export default MonthlyWidgetContainer