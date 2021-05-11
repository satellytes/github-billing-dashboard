import React, {useState} from "react";
import {GithubDailyEntry} from "../csv-reader";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


interface BillingChartProps {
    csvData: GithubDailyEntry[]/*{
        [key: string]: GithubDailyEntry[]
    }*/ | null
}


const BillingChart = ({csvData}: BillingChartProps): JSX.Element => {
    const [sortedBy, setSortedBy] = useState("daily");

    const colors = ["#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3", "#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3"]
    let repositoryNames: (string | number)[] = []
    const dropdownMenuOptions = ['daily', 'weakly'];


    // @ts-ignore
    const csvDataStructuredByDate: {[key: string]: GithubDailyEntry[]} = csvData.reduce((acc: { [key: string]: GithubDailyEntry[] }, obj: GithubDailyEntry) => {
        const key: string = obj.date;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});

    const getWeekNumber = (dateAsString: string) => {
        const d: Date  = new Date(dateAsString)
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        //@ts-ignore
        const weekNumber: number = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

        return weekNumber
    }

    const groupDataByDay = () => {
        let tempGroupedByDayArray = []
        for (let date in csvDataStructuredByDate) {
            let finalObj: { [key: string]: any } = {}
            // @ts-ignore
            csvDataStructuredByDate[date].forEach((obj: { repository: string | number; totalPrice: number; }) => {
                (obj.repository in finalObj) ? finalObj[obj.repository] = finalObj[obj.repository] + obj.totalPrice : finalObj[obj.repository] = obj.totalPrice

                finalObj[obj.repository] = parseFloat(finalObj[obj.repository].toFixed(4))
                if (!repositoryNames.includes(obj.repository)) repositoryNames.push(obj.repository)
            })
            finalObj["name"] = date
            tempGroupedByDayArray.push(finalObj)
        }
        return tempGroupedByDayArray
    }

    // @ts-ignore
    const groupDataByWeek = (groupedByDayArray) => {
        // @ts-ignore
        const dataSortedByWeekNumbers = groupedByDayArray.reduce((acc, obj) => {
            const key: number = getWeekNumber(obj.name);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

        let sortedByWeekNumberArray = []
        //sum up the prices of each repository to get the total price per week
        for(let week in dataSortedByWeekNumbers){

            let finalObj = {}
            // @ts-ignore
            //iterating over an array containing objects with the date as name and the repository-names with prices for this date
            dataSortedByWeekNumbers[week].forEach(obj => {
                for(let entry in obj){
                    //only the repositories with the prices are relevant
                    if(entry === "name") continue
                    // @ts-ignore
                    (entry in finalObj) ? finalObj[entry] = finalObj[entry] + obj[entry] : finalObj[entry] = obj[entry]
                    // @ts-ignore
                    finalObj[entry] = parseFloat(finalObj[entry].toFixed(4))
                }
            })
            // @ts-ignore
            finalObj["name"] = week
            sortedByWeekNumberArray.push(finalObj)
        }
        return sortedByWeekNumberArray
    }

    //[{name: date, (repositoryName: value)* }* ]
    const structuredData = () => {
        const groupedByDayArray = groupDataByDay()
        if (sortedBy === "daily") {
            return groupedByDayArray
        } else {
            return groupDataByWeek(groupedByDayArray)
        }
    }


    return (
        <div>
            <Dropdown options={dropdownMenuOptions} onChange={(selectedValue) => {
                setSortedBy(selectedValue.value)
            }} value={sortedBy} placeholder="Select an option"/>
            <BarChart
                width={1000}
                height={600}
                data={structuredData()}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="2 2"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                {/*TODO: color array is finite */}
                {repositoryNames.map((category, index) => <Bar dataKey={category} stackId="a" fill={colors[index]}
                                                               key={index}/>)}
            </BarChart>
        </div>
    )

}

export default BillingChart