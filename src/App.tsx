import React, { useEffect, useState } from "react";
import { getCsvFile, UsageReportEntry } from "./util/csv-reader";
import { WidgetContext } from "./components/context/widget-context";
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
  const [isDataFromDropzone, setIsDataFromDropzone] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const [selectedMonthFromWidget, setSelectedMonthFromWidget] = useState<{
    monthName: string;
    data: UsageReportEntry[];
  }>({ monthName: "", data: [] });

  //deactivate active widget when new data is loaded
  useEffect(() => {
    setSelectedMonthFromWidget({ monthName: "", data: [] });
  }, [csvData]);

  const handleFileInput = (file: File, isDataFromDropzoneCallback: boolean) => {
    setIsDataFromDropzone(isDataFromDropzoneCallback);
    getCsvFile(file).then((res) => {
      setCsvData(res);
    });
  };

  const handleInputFromLocalStorage = (csvData: UsageReportEntry[]) => {
    setCsvData(csvData);
    setIsDataFromDropzone(false);
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
          <HomePage
            handleInput={handleFileInput}
            handleInputFromLocalStorage={handleInputFromLocalStorage}
            isDataFromDropzone={isDataFromDropzone}
          />
          {csvData && <DashboardPage csvData={csvData} />}
        </WidgetContext.Provider>
      </MainContent>
    </Dropzone>
  );
};

export default App;
