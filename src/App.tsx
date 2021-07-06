import React, { useEffect, useRef, useState } from "react";
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
import { ChartContentHeadline } from "./components/headlines/chart-content-headline";
import { RepositoryTable } from "./components/repository-table/repository-table";
import { MonthlyWidgetContainer } from "./components/monthly-widget-container/monthly-widget-container";
import { ChartContainer } from "./components/billing-chart/chart-container";
import { Footer } from "./components/footer/footer";
import { RepositoryTableContext } from "./components/context/repository-table-context";
import {
  RepositoryColorContext,
  RepositoryColorType,
} from "./components/context/repository-color-context";
import {
  getChartColors,
  getRepositoryNames,
  groupEntriesPerDay,
  UsageReportDay,
} from "./util/group-entries";

const MainContent = styled(Grid)`
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 24px;
`;

const App = (): JSX.Element => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);
  const [entriesGroupedPerDay, setEntriesGroupedPerDay] = useState<
    UsageReportDay[]
  >([]);
  const [selectedMonthFromWidget, setSelectedMonthFromWidget] = useState<{
    monthName: string;
    data: UsageReportEntry[];
  }>({ monthName: "", data: [] });
  const [selectedRepositoriesFromTable, setSelectedRepositoriesFromTable] =
    useState<string[]>([]);
  const [repositoryColors, setRepositoryColors] = useState<
    RepositoryColorType[]
  >([]);
  const [repositoryNames, setRepositoryNames] = useState<string[]>([]);

  const chartContentHeadlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setSelectedMonthFromWidget({ monthName: "", data: [] });
    setRepositoryNames(csvData ? getRepositoryNames(csvData) : []);
    setEntriesGroupedPerDay(csvData ? groupEntriesPerDay(csvData) : []);
  }, [csvData]);

  useEffect(() => {
    setRepositoryColors(getChartColors(repositoryNames));
    executeScrollToChart();
  }, [repositoryNames]);

  const handleFileInput = (file: File | null) => {
    if (file) {
      getCsvFile(file).then((res) => {
        setCsvData(res);
        setSelectedFileName(file.name);
      });
    } else {
      setCsvData(null);
      setSelectedFileName("");
    }
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

  const handleTableCheckboxClick = (repositories: string[]) => {
    setSelectedRepositoriesFromTable(repositories);
  };

  const executeScrollToChart = () => {
    if (
      chartContentHeadlineRef !== null &&
      chartContentHeadlineRef.current !== null
    ) {
      chartContentHeadlineRef.current.scrollIntoView();
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
            activeFileName={selectedFileName}
          />
          <RepositoryTableContext.Provider
            value={{
              activeRepositories: selectedRepositoriesFromTable,
              setActiveRepositories: (repositories: string[]) =>
                handleTableCheckboxClick(repositories),
            }}
          >
            <RepositoryColorContext.Provider value={repositoryColors}>
              {csvData && (
                <>
                  <ChartContentHeadline refProp={chartContentHeadlineRef} />
                  <MonthlyWidgetContainer
                    csvData={csvData}
                    entriesGroupedPerDay={entriesGroupedPerDay}
                  />

                  <ChartContainer
                    csvData={csvData}
                    repositoryNames={repositoryNames}
                    entriesGroupedPerDay={entriesGroupedPerDay}
                  />
                  <RepositoryTable csvData={csvData} />
                </>
              )}
            </RepositoryColorContext.Provider>
          </RepositoryTableContext.Provider>
        </WidgetContext.Provider>
      </MainContent>
      <Footer />
    </Dropzone>
  );
};

export default App;
