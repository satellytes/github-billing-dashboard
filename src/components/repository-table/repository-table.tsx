import React, { useContext, useEffect, useState } from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { getCostPerRepository } from "../../util/group-entries";
import { Grid, GridItem, up } from "../grid/grid";
import styled from "styled-components";
import { WidgetContext } from "../context/widget-context";
import { RepositoryTableContext } from "../context/repository-table-context";

interface RepositoryTableProps {
  csvData: UsageReportEntry[];
}

const StyledTable = styled.div`
  margin-top: 24px;
`;

const TableEntry = styled.p`
  margin-bottom: 8px;
  margin-left: 8px;
`;

const TableLink = styled.a`
  display: block;
  text-decoration: none;
  color: white;
  margin-bottom: 8px;
  margin-left: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const TableValue = styled.p`
  margin-bottom: 8px;
  text-align: right;
  ${`${up("sm")}{
      text-align: left;
   }`}
`;

//https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: rgba(122, 143, 204, 0.3);
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const CheckboxDiv = styled.div`
  display: flex;
`;

export const RepositoryTable = ({
  csvData,
}: RepositoryTableProps): JSX.Element => {
  const { activeMonth } = useContext(WidgetContext);
  const { setActiveRepositories } = useContext(RepositoryTableContext);
  const costPerRepository = activeMonth.monthName
    ? getCostPerRepository(activeMonth.data)
    : getCostPerRepository(csvData);

  const [checkedRepositories, setCheckedRepositories] = useState<boolean[]>(
    costPerRepository.map(() => true)
  );

  useEffect(() => {
    setCheckedRepositories(costPerRepository.map(() => true));
  }, [csvData, activeMonth]);

  useEffect(() => {
    const currentActiveRepositories: string[] = [];
    checkedRepositories.forEach((isChecked, index) => {
      if (isChecked) {
        currentActiveRepositories.push(costPerRepository[index].repositoryName);
      }
    });
    setActiveRepositories(currentActiveRepositories);
  }, [checkedRepositories]);

  const Checkbox = ({
    checked,
    onChange,
    ...props
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={onChange} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );

  return (
    <GridItem>
      <StyledTable>
        <Grid>
          <GridItem xs={6}>
            {costPerRepository.map((repository, index) => {
              const isLink = !(
                repository.repositoryName.includes(" ") ||
                repository.repositoryName.includes("sample-repository-")
              );
              return (
                <CheckboxDiv key={index}>
                  <label>
                    <Checkbox
                      checked={checkedRepositories[index]}
                      onChange={() => {
                        setCheckedRepositories(
                          checkedRepositories.map((item, position) =>
                            index === position ? !item : item
                          )
                        );
                      }}
                    />
                  </label>
                  {isLink ? (
                    <TableLink
                      href={`https://github.com/${repository.repositoryName}`}
                      key={index}
                      target={"_blank"}
                    >
                      {repository.repositoryName}
                    </TableLink>
                  ) : (
                    <TableEntry key={index}>
                      {repository.repositoryName}
                    </TableEntry>
                  )}
                </CheckboxDiv>
              );
            })}
          </GridItem>
          <GridItem xs={6}>
            {costPerRepository.map((repository, index) => {
              return (
                <TableValue key={index}>{`${
                  Math.round(repository.totalCost * 100) / 100
                }$`}</TableValue>
              );
            })}
          </GridItem>
        </Grid>
      </StyledTable>
    </GridItem>
  );
};
