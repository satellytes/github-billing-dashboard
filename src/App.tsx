import React, { useEffect, useState } from "react";
import { getCsvFile, UsageReportEntry } from "./util/csv-reader";
import { WidgetContext } from "./components/context/widget-context";
import { Grid } from "./components/grid/grid";
import styled from "styled-components";
import { Header } from "./components/header/header";
import { GlobalStyles } from "./global-styles";
import { Dropzone } from "./components/dropzone/dropzone";
import { MainHeadline } from "./components/headlines/main-headline";
import { StartDescription } from "./components/start-description/start-description";
import { FileInput } from "./components/file-input/file-input";
import { CurrentTimePeriode } from "./components/headlines/current-time-periode";
import { RepositoryTable } from "./components/repository-table/repository-table";
import { MonthlyWidgetContainer } from "./components/monthly-widget-container/monthly-widget-container";
import { ChartContainer } from "./components/billing-chart/chart-container";

const MainContent = styled(Grid)`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
`;

const App = (): JSX.Element => {
  const [activeFileName, setActiveFileName] = useState<string>("");
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const [selectedMonthFromWidget, setSelectedMonthFromWidget] = useState<{
    monthName: string;
    data: UsageReportEntry[];
  }>({ monthName: "", data: [] });

  //deactivate active widget when new data is loaded
  useEffect(() => {
    setSelectedMonthFromWidget({ monthName: "", data: [] });
  }, [csvData]);

  const handleFileInput = (file: File) => {
    getCsvFile(file).then((res) => {
      setCsvData(res);
      setActiveFileName("");
      setActiveFileName(file.name);
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
    <Dropzone onInput={handleFileInput}>
      <GlobalStyles />
      <Header />
      <MainContent>
        <WidgetContext.Provider
          value={{
            activeMonth: selectedMonthFromWidget,
            setActiveMonth: (month: string, data: UsageReportEntry[]) =>
              handleWidgetClick(month, data),
          }}
        >
          <MainHeadline />
          <StartDescription />
          <FileInput
            onInput={handleFileInput}
            handleInputFromLocalStorage={handleInputFromLocalStorage}
            activeFileName={activeFileName}
          />
          {csvData && <CurrentTimePeriode csvData={csvData} />}
          {csvData && <RepositoryTable csvData={csvData} />}
          {csvData && <MonthlyWidgetContainer csvData={csvData} />}
          {csvData && <ChartContainer csvData={csvData} />}
        </WidgetContext.Provider>
      </MainContent>
    </Dropzone>
  );
};

export default App;
