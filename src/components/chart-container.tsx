import React, {useContext, useState} from "react";
import {UsageReportEntry} from "../csv-reader";
import {BillingBarChart} from "./billing-bar-chart";
import {BillingLineChart} from "./billing-line-chart";
import "./chart-container.css"
import {WidgetContext} from "./widget-context";
import {getMaximumTotalPriceOfAllDays, getMaximumTotalPriceOfAllWeeks} from "../group-entries";

interface ChartContainerProps {
    csvData: UsageReportEntry[]
}

export const ChartContainer = ({csvData}: ChartContainerProps): JSX.Element => {
    const [diagramType, setDiagramType] = useState<"Bar" | "Line">("Bar")
    const [groupedBy, setGroupedBy] = useState<"daily" | "weekly">("daily")


    // Selected month from mini widgets
    const {activeMonth} = useContext(WidgetContext)

    const maxDailyValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData)
    const maxWeeklyValueOfYAxis = getMaximumTotalPriceOfAllWeeks(csvData)


    return (
        <>
            <h2>Angezeigter Zeitraum</h2>
            <p>{activeMonth.monthName || `${csvData[0].date} bis ${csvData[csvData.length - 1].date} (kompletter Datensatz)`}</p>
            <div className={"toggleButtonDiv"}>
                <div>
                    <button
                        className={`toggleButton LeftToggleButton ${groupedBy === "daily" ? "active" : null}`}
                        onClick={() => setGroupedBy("daily")}>
                        Daily
                    </button>
                    <button
                        className={`toggleButton RightToggleButton ${groupedBy === "weekly" ? "active" : null}`}
                        onClick={() => setGroupedBy("weekly")}>
                        Weekly
                    </button>
                </div>

                <div>
                    <button className={`toggleButton LeftToggleButton ${diagramType === "Bar" ? "active" : null}`}
                            onClick={() => setDiagramType("Bar")}>
                        Bar
                    </button>
                    <button className={`toggleButton RightToggleButton ${diagramType === "Line" ? "active" : null}`}
                            onClick={() => setDiagramType("Line")}>
                        Line
                    </button>
                </div>
            </div>
            {diagramType === "Bar" ? <BillingBarChart maxValueOfYAxis={groupedBy === "daily" ? maxDailyValueOfYAxis : maxWeeklyValueOfYAxis} csvData={activeMonth.monthName === "" ? csvData : activeMonth.data} groupedBy={groupedBy}/> :
                <BillingLineChart maxValueOfYAxis={groupedBy === "daily" ? maxDailyValueOfYAxis : maxWeeklyValueOfYAxis} csvData={activeMonth.monthName === "" ? csvData : activeMonth.data} groupedBy={groupedBy}/>}
        </>
    )
}

