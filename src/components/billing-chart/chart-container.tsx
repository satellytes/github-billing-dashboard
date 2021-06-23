import React, { useContext, useState } from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { WidgetContext } from "../context/widget-context";
import {
  getMaximumTotalPriceOfAllDays,
  getMaximumTotalPriceOfAllWeeks,
  groupEntriesPerDay,
  groupEntriesPerWeek,
} from "../../util/group-entries";
import styled from "styled-components";
import { GridItem } from "../grid/grid";
import { BillingChart } from "./billing-chart";

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
  margin-top: 24px;
  margin-bottom: 437px;
  padding-right: 24px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
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
  const entriesGroupedPerWeek = groupEntriesPerWeek(
    currentData,
    isDataFromWidget
  );

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
      <GridItem>
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
        <ChartDiv>
          <BillingChart
            maxValueOfYAxis={currentMaxValueOfYAxis}
            groupedBy={groupedBy}
            repositoryNames={repositoryNames()}
            entriesGroupedPerDay={entriesGroupedPerDay}
            entriesGroupedPerWeek={entriesGroupedPerWeek}
            diagrammType={diagramType}
          />
        </ChartDiv>
      </GridItem>
    </>
  );
};
