import React, {useState} from "react";
import {UsageReportEntry} from "../csv-reader";
import BillingBarChart from "./billing-bar-chart";
import BillingLineChart from "./billing-line-chart";
import Dropdown from "react-dropdown";

interface ChartContainerProps {
    csvData: UsageReportEntry[]
}

const ChartContainer = ({csvData}: ChartContainerProps): JSX.Element => {
    const [diagramType, setDiagramType] = useState<"Bar" | "Line" >("Bar")
    const [groupedBy, setGroupedBy] = useState<"daily" | "weekly">("daily")

    const diagramTypeOptions = ["Bar", "Line"]
    const groupedByOptions = ['daily', 'weekly']
    return (
        <>
            <h2>Angezeigter Zeitraum</h2>
            <p>{`${csvData[0].date} bis ${csvData[csvData.length-1].date}`}</p>
            <Dropdown
                options={diagramTypeOptions}
                onChange={(selectedValue) => {
                    // @ts-ignore
                    setDiagramType(selectedValue.value)
                }}
                value={diagramType}
            />
            <Dropdown
                options={groupedByOptions}
                onChange={(selectedValue) => {
                    // @ts-ignore
                    setGroupedBy(selectedValue.value)
                }}
                value={groupedBy}/>
            {diagramType === "Bar" ? <BillingBarChart csvData={csvData} groupedBy={groupedBy}/> : <BillingLineChart csvData={csvData} groupedBy={groupedBy}/>}


        </>
    )
}

export default ChartContainer