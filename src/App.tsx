import React, {useState} from "react"
import Rechart from "./rechart";
import FileInput from "./file-input"
import { parse } from 'papaparse'
import {ParseResult} from "papaparse";


function App() {
    const [csvData, setCsvData] = useState(null);

    const getCsvFile = (file: string | File | NodeJS.ReadableStream) => {
        let csvArr: { date: any; product: any; repository: any; value: number; unit: any; workflow: any; notes: any; }[] | React.SetStateAction<null> | unknown[][] = []

      parse(file, {
            worker: true,
            step: (result:ParseResult<any>) => {
                // @ts-ignore
                csvArr.push(result.data)
            },
            complete: () => {

                //remove last element of the CSV-Array (empty string)
                // @ts-ignore
                csvArr.pop()
                //remove first element of the CSV-Array (table headers)
                // @ts-ignore
                csvArr.shift()

                //transform CSV Arr into objects
                // @ts-ignore
                const csvDataStructuredAsObjects = csvArr.map((value) => {
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
                // @ts-ignore
                const csvDataStructuredByDate = csvDataStructuredAsObjects.reduce((acc, obj) => {
                    const key = obj.date;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(obj);
                    return acc;
                }, {})
                console.log(csvDataStructuredByDate)
                // @ts-ignore
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
