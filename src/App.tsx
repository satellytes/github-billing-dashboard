import React, {useState} from "react"
import Rechart from "./rechart";
import FileInput from "./fileInput"
import * as Papa from 'papaparse'

function App() {
    const [csvData, setCsvData] = useState(null);

    const getCsvFile = (file: string | File | NodeJS.ReadableStream) => {
        let csvArr: { date: any; product: any; repository: any; value: number; unit: any; workflow: any; notes: any; }[] | React.SetStateAction<null> | unknown[][] = []

      Papa.parse(file, {
            worker: true,
            step: function (result) {
                // @ts-ignore
                csvArr.push(result.data)
            },
            complete: function () {
                // @ts-ignore
                csvArr.pop()
                // @ts-ignore
                csvArr.shift()

                //transform CSV Arr into objects
                // @ts-ignore
                csvArr = csvArr.map((value) => {
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
                csvArr = csvArr.reduce(function (acc, obj) {
                    let key = obj.date;
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(obj);
                    return acc;
                }, {})
                console.log(csvArr)
                // @ts-ignore
                setCsvData(csvArr)

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
