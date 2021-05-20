import React from "react";
import {UsageReportEntry} from "../csv-reader";
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {
    groupEntriesPerDay,
    groupEntriesPerWeek,
    getPriceByRepositoryName
} from "../group-entries";
import 'react-dropdown/style.css';
import {lightFormat} from "date-fns";

interface TestLineChartProps {
    csvData: UsageReportEntry[],
    groupedBy: ("daily" | "weekly"),
    maxValueOfYAxis: number
}


export const BillingLineChart = ({csvData, groupedBy, maxValueOfYAxis}: TestLineChartProps): JSX.Element => {

    const entriesGroupedPerDay = groupEntriesPerDay(csvData)
    const entriesGroupedPerWeek = groupEntriesPerWeek(csvData)


    // @ts-ignore
    const repositoryNames = [...new Set(csvData.map((entry) => entry.repositorySlug))]
    const colors = ["#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3", "#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3"]


    return (
        <>
            <LineChart
                width={1000}
                height={600}
                data={(groupedBy === "daily")? entriesGroupedPerDay : entriesGroupedPerWeek}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >

                <XAxis dataKey={(groupedBy === "daily")? "day" : "week"} tickFormatter={(tick) => Date.parse(tick) ? lightFormat(new Date(tick), "dd.MM.") : tick} interval="preserveStart"/>
                <YAxis domain={[0, maxValueOfYAxis]} unit=" $"/>
                {/*labelFormatter checks if the given label has the right format*/}
                <Tooltip labelFormatter={(label) => Date.parse(label) ? lightFormat(new Date(label), "dd.MM.") : label}/>
                <Legend/>
                {repositoryNames.map((repositoryName, index) => {
                    return <Line
                        type="monotone"
                        stroke={colors[index]}
                        dataKey={(currentEntry) => getPriceByRepositoryName(repositoryName, currentEntry.entries)}
                        key={index}
                        name={repositoryName}
                        unit={"$"}
                        strokeWidth={4}
                        dot={false}
                    />
                })}
            </LineChart>
        </>
    )
}

