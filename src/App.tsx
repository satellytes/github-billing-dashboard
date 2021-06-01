import React, { useState } from "react";
import { FileInput } from "./components/file-input/file-input";
import { ChartContainer } from "./components/chart-container/chart-container";
import { MonthlyWidgetContainer } from "./components/monthly-widget-container/monthly-widget-container";
import { getCsvFile, UsageReportEntry } from "./csv-reader";
import { WidgetContext } from "./components/context/widget-context";
import { Headline } from "./components/headline/headline";
import { StartScreen } from "./components/start-screen/start-screen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";

const MainContent = styled.div`
  max-width: 1280px;
`;

const App = (): JSX.Element => {
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const handleInput = (file: File) => {
    getCsvFile(file).then((res) => {
      setCsvData(res);
    });
  };

  const handleWidgetClick = (month: string, data: UsageReportEntry[]) => {
    if (month === selectedMonthFromWidget.monthName) {
      setSelectedMonthFromWidget({ monthName: "", data: [] });
    } else {
      setSelectedMonthFromWidget({ monthName: month, data: data });
    }
  };

  const [selectedMonthFromWidget, setSelectedMonthFromWidget] = useState<{
    monthName: string;
    data: UsageReportEntry[];
  }>({ monthName: "", data: [] });

  return (
    <Router>
      <MainContent>
        <WidgetContext.Provider
          value={{
            activeMonth: selectedMonthFromWidget,
            setActiveMonth: (month: string, data: UsageReportEntry[]) =>
              handleWidgetClick(month, data),
          }}
        >
          <div className="App">
            <Headline />
            <Switch>
              <Route path="/github-billing-dashboard">
                {!csvData && <StartScreen />}
                {!csvData && <FileInput onInput={handleInput} />}
                {csvData && <MonthlyWidgetContainer csvData={csvData} />}
                {csvData && <ChartContainer csvData={csvData} />}
              </Route>
            </Switch>
          </div>
        </WidgetContext.Provider>
      </MainContent>
    </Router>
  );
};

export default App;
