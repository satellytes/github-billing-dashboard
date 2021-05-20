import React from "react";
import {UsageReportEntry} from "../csv-reader";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {groupEntriesPerDay, groupEntriesPerWeek, getPriceByRepositoryName} from "../group-entries";
import {lightFormat} from "date-fns";
import 'react-dropdown/style.css';

interface BillingChartProps {
    csvData: UsageReportEntry[],
    groupedBy: ("daily" | "weekly")
}

export const BillingBarChart = ({csvData, groupedBy}: BillingChartProps): JSX.Element => {
    const entriesGroupedPerDay = groupEntriesPerDay(csvData)
    const entriesGroupedPerWeek = groupEntriesPerWeek(csvData)
    // @ts-ignore
    const repositoryNames = [...new Set(csvData.map((entry) => entry.repositorySlug))]
    const colors = ["#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3", "#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3"]


    return (
        <>
            <BarChart width={1000} height={600} data={(groupedBy === "daily")? entriesGroupedPerDay : entriesGroupedPerWeek}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey={(groupedBy === "daily")? "day" : "week"} tickFormatter={(tick) => Date.parse(tick) ? lightFormat(new Date(tick), "dd.MM.") : tick} interval="preserveStart" />
                <YAxis/>
               {/*labelFormatter checks if the given label has the right format*/}
                <Tooltip labelFormatter={(label) => Date.parse(label) ? lightFormat(new Date(label), "dd.MM.") : label} />
                <Legend/>
                {repositoryNames.map(((repositoryName, index) => {
                    return <Bar
                        dataKey={(currentEntry) => getPriceByRepositoryName(repositoryName, currentEntry.entries) }
                        stackId="a" fill={colors[index]}
                        key={index}
                        name={repositoryName}
                        unit={"$"}
                    />
                }))}

            </BarChart>
        </>
    )
}
