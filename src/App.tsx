import React, {useState} from "react"
import BillingChart from "./components/billing-chart";
import FileInput from "./components/file-input"
import {getCsvFile} from "./csv-reader";


const App = (): JSX.Element => {
    const [csvData, setCsvData] = useState(null);

    const handleFileSubmit = (file: string | File | NodeJS.ReadableStream) => {

        // @ts-ignore
        getCsvFile(file).then(res  => setCsvData(res))
    }


    return (
        <div className="App">
            <FileInput onSubmit={handleFileSubmit}/>
            {csvData ?
                <BillingChart csvData={csvData}/>
                : ""}
        </div>
    );
}

export default App;
