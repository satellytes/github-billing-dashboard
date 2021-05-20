import React, {useState} from "react"
import {FileInput} from "./components/file-input"
import {ChartContainer} from "./components/chart-container";
import {MonthlyWidgetContainer} from "./components/monthly-widget-container";
import {getCsvFile, UsageReportEntry} from "./csv-reader";



const App = (): JSX.Element => {
    const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);

    const handleFileSubmit = (file: File) => {
        getCsvFile(file).then(res => {
            setCsvData(res)
        })

    }

    return (
        <div className="App">
            <FileInput onSubmit={handleFileSubmit}/>
            {csvData && <MonthlyWidgetContainer csvData={csvData}/>}
            {csvData && <ChartContainer csvData={csvData}/>}
        </div>

    );
}

export default App;
