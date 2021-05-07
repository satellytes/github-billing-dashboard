import React from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

interface RechartProps {
    csvData: {
        [key: string]: {
            date: string;
            notes: string;
            product: string;
            repository: string;
            unit: string;
            value: number;
            workflow: string
        }[]
    } | null
}


const Rechart = ({csvData}: RechartProps): JSX.Element =>  {
    let colors = ["#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3", "#233666", "#96ADEA", "#4F79E6", "#414C66", "#3D5EB3" ]
    let repositoryNames: (string | number)[] = []

    //[{name: date, (repositoryName: value)* }* ]
    const sortedData = () => {
        let tempSortedDataArr = []

        for(let date in csvData){
            let finalObj= {}
            csvData[date].forEach((obj: { repository: string | number; value: any; })=>{
                // @ts-ignore
                (obj.repository in finalObj) ? finalObj[obj.repository] = finalObj[obj.repository] + obj.value : finalObj[obj.repository] = obj.value
                if(!repositoryNames.includes(obj.repository)) repositoryNames.push(obj.repository)
            })
            // @ts-ignore
            finalObj["name"] = date
            tempSortedDataArr.push(finalObj)
        }
        return tempSortedDataArr
    }


    return (
        <BarChart
            width={1000}
            height={600}
            data={sortedData()}
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
            {repositoryNames.map((category, index) => <Bar dataKey={category} stackId="a" fill={colors[index]} key={index} />)}
        </BarChart>

    )

}

export default Rechart