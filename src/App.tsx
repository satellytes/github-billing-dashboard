import React, {useState} from "react"
import Rechart from "./rechart";
import FileInput from "./file-input"
import {parse} from 'papaparse'
import {ParseResult} from "papaparse";

export interface DailyEntry {
    date: string,
    product: string,
    repository: string,
    value: number,
    unit: string,
    workflow: string,
    notes: string
}

function App() {
    const [csvData, setCsvData] = useState(null);

    const getCsvFile = (file: string | File | NodeJS.ReadableStream) => {
        let csvArr: string[][] = []


        parse(file, {
            worker: true,
            step: (result: ParseResult<any>) => {
                csvArr.push(result.data)
            },
            complete: () => {

                //last element is an empty string
                csvArr.pop()
                //first element is an array with the headlines and no relevant data
                csvArr.shift()

                //transform CSV Arr into objects
                const csvDataStructuredAsObjects: DailyEntry[] = csvArr.map((value) => {
                    return {
                        date: value[0],
                        product: value[1],
                        repository: value[2],
                        value: (parseFloat(value[3]) * parseFloat(value[5].substring(1))),
                        unit: value[4],
                        workflow: value[6],
                        notes: value[7]
                    }
                })

                //structure CSV-Data by date
                const csvDataStructuredByDate: { [key: string]: DailyEntry[] }
                    = csvDataStructuredAsObjects.reduce((acc: { [key: string]: DailyEntry[] }, obj: DailyEntry) => {
                    const key: string = obj.date;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(obj);
                    return acc;
                }, {})

                //@ts-ignore
                setCsvData(csvDataStructuredByDate)

            }
        });

    }

    return (
        <div className="App">
            <FileInput callback={getCsvFile}/>
            {csvData ?
                <Rechart csvData={csvData}/>
                : ""}
        </div>
    );
}

export default App;
