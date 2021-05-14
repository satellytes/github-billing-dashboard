import React, {useState} from "react"
import BillingChart from "./components/billing-chart";
import FileInput from "./components/file-input"
import {getCsvFile, UsageReportEntry} from "./csv-reader";


const App = (): JSX.Element => {
    const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);

    const handleFileSubmit = (file: File) => {
        getCsvFile(file).then(res  => setCsvData(res))
    }

    return (
        <div className="App">
            <FileInput onSubmit={handleFileSubmit}/>
            {csvData && <BillingChart csvData={csvData}/>}
        </div>
    );
}

export default App;
