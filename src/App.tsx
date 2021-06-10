import React, { useState } from "react";
import { getCsvFile, UsageReportEntry } from "./util/csv-reader";
import { WidgetContext } from "./components/context/widget-context";
import { Headline } from "./components/headline/headline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Start } from "./pages/start";
import { RunningApplication } from "./pages/running-application";
import { Grid } from "./components/grid/grid";
import styled from "styled-components";

const MainContent = styled(Grid)`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
`;

const App = (): JSX.Element => {
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const [selectedMonthFromWidget, setSelectedMonthFromWidget] = useState<{
    monthName: string;
    data: UsageReportEntry[];
  }>({ monthName: "", data: [] });

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
          <Headline />
          <Switch>
            <Route path="/github-billing-dashboard">
              <Start handleInput={handleInput} />
            </Route>
            <Route path="/active">
              {csvData && <RunningApplication csvData={csvData} />}
            </Route>
          </Switch>
        </WidgetContext.Provider>
      </MainContent>
    </Router>
  );
};

export default App;
