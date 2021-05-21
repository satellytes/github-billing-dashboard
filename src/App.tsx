import React, { useState } from "react";
import { FileInput } from "./components/file-input";
import { ChartContainer } from "./components/chart-container";
import { MonthlyWidgetContainer } from "./components/monthly-widget-container";
import { getCsvFile, UsageReportEntry } from "./csv-reader";
import { WidgetContext } from "./components/widget-context";

const App = (): JSX.Element => {
  const [csvData, setCsvData] = useState<UsageReportEntry[] | null>(null);

  const handleFileSubmit = (file: File) => {
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
    <WidgetContext.Provider
      value={{
        activeMonth: selectedMonthFromWidget,
        setActiveMonth: (month: string, data: UsageReportEntry[]) =>
          handleWidgetClick(month, data),
      }}
    >
      <div className="App">
        <FileInput onSubmit={handleFileSubmit} />
        {csvData && <MonthlyWidgetContainer csvData={csvData} />}
        {csvData && <ChartContainer csvData={csvData} />}
      </div>
    </WidgetContext.Provider>
  );
};

export default App;
