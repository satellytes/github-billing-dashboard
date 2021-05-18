import React, {useState} from "react";
import {UsageReportEntry} from "../csv-reader";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {groupEntriesPerDay, groupEntriesPerWeek} from "../group-entries";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface BillingChartProps {
    csvData: UsageReportEntry[]
}

const BillingChart = ({csvData}: BillingChartProps): JSX.Element => {
    const [groupedBy, setGroupedBy] = useState<"daily" | "weekly">("daily")

    const dropdownMenuOptions = ['daily', 'weekly'];
    const entriesGroupedPerDay = groupEntriesPerDay(csvData)
    const entriesGroupedPerWeek = groupEntriesPerWeek(csvData)

    // @ts-ignore
    const repositoryNames = [...new Set(csvData.map((entry) => entry.repositorySlug))]
    const colors = ["#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3", "#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3"]


    const getPriceByRepositoryName = (repositoryName: string, currentEntries: UsageReportEntry[]) => {
        let priceByRepositoryName = 0
        currentEntries.forEach((entry) => {
            if(entry.repositorySlug === repositoryName){
                priceByRepositoryName += entry.totalPrice
            }
        })
        return Math.round(priceByRepositoryName * 100) / 100
    }

    return (
        <>
            <Dropdown
                options={dropdownMenuOptions}
                onChange={(selectedValue) => {
                    // @ts-ignore
                    setGroupedBy(selectedValue.value)
                }}
                value={groupedBy}/>

            <BarChart width={1000} height={600} data={(groupedBy === "daily")? entriesGroupedPerDay : entriesGroupedPerWeek}>
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey={(groupedBy === "daily")? "day" : "week"}/>
                <YAxis/>
                <Tooltip/>
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

export default BillingChart

