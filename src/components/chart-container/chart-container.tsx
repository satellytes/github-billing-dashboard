import React, { useContext, useState } from "react";
import { UsageReportEntry } from "../../csv-reader";
import { BillingBarChart } from "../billing-chart/billing-bar-chart";
import { BillingLineChart } from "../billing-chart/billing-line-chart";
import { WidgetContext } from "../context/widget-context";
import {
  getMaximumTotalPriceOfAllDays,
  getMaximumTotalPriceOfAllWeeks,
  groupEntriesPerDay,
  groupEntriesPerWeek,
} from "../../group-entries";
import { getPeriodOfTimeString } from "../../date-util";
import styled from "styled-components";

interface ChartContainerProps {
  csvData: UsageReportEntry[];
}

const ChartDiv = styled.div`
  background: linear-gradient(
    180deg,
    rgba(122, 143, 204, 0) 0%,
    rgba(122, 143, 204, 0.3) 100%
  );
  border-radius: 4px;
  margin: 32px 16px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;

const Button = styled.button`
  background: ${(props: { isActive: boolean }) =>
    props.isActive ? "#668cff" : "rgba(255, 255, 255, 0.1)"};
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: white;
`;

const LeftToggleButton = styled(Button)`
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

const RightToggleButton = styled(Button)`
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;

export const ChartContainer = ({
  csvData,
}: ChartContainerProps): JSX.Element => {
  const [diagramType, setDiagramType] = useState<"Bar" | "Line">("Bar");
  const [groupedBy, setGroupedBy] = useState<"daily" | "weekly">("daily");

  // Selected month from mini-widgets
  const { activeMonth } = useContext(WidgetContext);

  const maxDailyValueOfYAxis = getMaximumTotalPriceOfAllDays(csvData);
  const maxWeeklyValueOfYAxis = getMaximumTotalPriceOfAllWeeks(csvData);
  const currentMaxValueOfYAxis =
    groupedBy === "daily" ? maxDailyValueOfYAxis : maxWeeklyValueOfYAxis;

  //currentData changes when a mini-widget is selected
  const isDataFromWidget = !(activeMonth.monthName === "");
  const currentData = isDataFromWidget ? activeMonth.data : csvData;

  const entriesGroupedPerDay = groupEntriesPerDay(currentData);
  const entriesGroupedPerWeek = groupEntriesPerWeek(currentData);

  const repositoryNames = (): string[] => {
    const repositoryNamesWithDuplicates = csvData.map(
      (entry) => entry.repositorySlug
    );
    return repositoryNamesWithDuplicates.filter(
      (value, index) => repositoryNamesWithDuplicates.indexOf(value) === index
    );
  };

  return (
    <>
      <h2>Angezeigter Zeitraum</h2>
      <p>{activeMonth.monthName || getPeriodOfTimeString(csvData)}</p>
      <ChartDiv>
        <ButtonDiv>
          <div>
            <LeftToggleButton
              isActive={groupedBy === "daily"}
              onClick={() => setGroupedBy("daily")}
            >
              Daily
            </LeftToggleButton>
            <RightToggleButton
              isActive={groupedBy === "weekly"}
              onClick={() => setGroupedBy("weekly")}
            >
              Weekly
            </RightToggleButton>
          </div>

          <div>
            <LeftToggleButton
              isActive={diagramType === "Bar"}
              onClick={() => setDiagramType("Bar")}
            >
              Bar
            </LeftToggleButton>
            <RightToggleButton
              isActive={diagramType === "Line"}
              onClick={() => setDiagramType("Line")}
            >
              Line
            </RightToggleButton>
          </div>
        </ButtonDiv>
        {diagramType === "Bar" ? (
          <BillingBarChart
            maxValueOfYAxis={currentMaxValueOfYAxis}
            groupedBy={groupedBy}
            repositoryNames={repositoryNames()}
            entriesGroupedPerDay={entriesGroupedPerDay}
            entriesGroupedPerWeek={entriesGroupedPerWeek}
          />
        ) : (
          <BillingLineChart
            maxValueOfYAxis={currentMaxValueOfYAxis}
            groupedBy={groupedBy}
            repositoryNames={repositoryNames()}
            entriesGroupedPerDay={entriesGroupedPerDay}
            entriesGroupedPerWeek={entriesGroupedPerWeek}
          />
        )}
      </ChartDiv>
    </>
  );
};
