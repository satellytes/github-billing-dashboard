import React, { useState } from "react";
import { getCsvFile, UsageReportEntry } from "./util/csv-reader";
import { WidgetContext } from "./components/context/widget-context";
import { Headline } from "./components/headline/headline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import { DashboardPage } from "./pages/dashboard-page";
import { Grid } from "./components/grid/grid";
import styled from "styled-components";
import { Header } from "./components/header/header";
import { GlobalStyles } from "./global-styles";
import { Dropzone } from "./components/dropzone/dropzone";

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

  const handleFileInput = (file: File) => {
    getCsvFile(file).then((res) => {
      setCsvData(res);
    });
  };

  const handleInputFromLocalStorage = (csvData: UsageReportEntry[]) => {
    setCsvData(csvData);
  };

  const handleWidgetClick = (month: string, data: UsageReportEntry[]) => {
    if (month === selectedMonthFromWidget.monthName) {
      setSelectedMonthFromWidget({ monthName: "", data: [] });
    } else {
      setSelectedMonthFromWidget({ monthName: month, data: data });
    }
  };

  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <GlobalStyles />

      <Dropzone onInput={handleFileInput}>
        <Header />
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
              <Route exact path="/">
                <HomePage
                  handleInput={handleFileInput}
                  handleInputFromLocalStorage={handleInputFromLocalStorage}
                />
              </Route>
              <Route path="/dashboard">
                {csvData && <DashboardPage csvData={csvData} />}
              </Route>
            </Switch>
          </WidgetContext.Provider>
        </MainContent>
      </Dropzone>
    </Router>
  );
};

export default App;
