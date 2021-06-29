import React, { useContext, useEffect, useState } from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import {
  getColorFromRepositoryName,
  getCostPerRepository,
} from "../../util/group-entries";
import { Grid, GridItem, up } from "../grid/grid";
import styled from "styled-components";
import { WidgetContext } from "../context/widget-context";
import { RepositoryTableContext } from "../context/repository-table-context";
import {
  RepositoryColorContext,
  RepositoryColorType,
} from "../context/repository-color-context";

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

const TableValue = styled.p`
  margin-bottom: 8px;
  text-align: right;
  ${`${up("sm")}{
      text-align: left;
   }`}
`;

const ColorIcon = styled.span<{
  repositoryName: string;
  colorContext: RepositoryColorType[];
}>`
  color: ${(props) =>
    getColorFromRepositoryName(props.repositoryName, props.colorContext)}; ;
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

const LeftTableRow = styled.div`
  display: flex;
`;

export const RepositoryTable = ({
  csvData,
}: RepositoryTableProps): JSX.Element => {
  const { activeMonth } = useContext(WidgetContext);
  const { setActiveRepositories } = useContext(RepositoryTableContext);
  const colorsPerRepositoryName = useContext(RepositoryColorContext);
  const costPerRepository = activeMonth.monthName
    ? getCostPerRepository(activeMonth.data)
    : getCostPerRepository(csvData);

  const [checkedRepositories, setCheckedRepositories] = useState<
    { repositoryName: string; checked: boolean }[]
  >(
    costPerRepository.map((repository) => {
      return { repositoryName: repository.repositoryName, checked: true };
    })
  );
  const [globalCheckbox, setGlobalCheckbox] = useState<boolean>(true);

  useEffect(() => {
    setCheckedRepositories(
      costPerRepository.map((repository) => {
        return { repositoryName: repository.repositoryName, checked: true };
      })
    );
    setGlobalCheckbox(true);
  }, [csvData, activeMonth]);

  useEffect(() => {
    if (checkedRepositories.length === costPerRepository.length) {
      const currentActiveRepositories: string[] = [];
      checkedRepositories.forEach((repository) => {
        if (repository.checked) {
          currentActiveRepositories.push(repository.repositoryName);
        }
      });
      setActiveRepositories(currentActiveRepositories);
    }
  }, [checkedRepositories]);

  const total = costPerRepository.reduce(
    (acc, repository2) => acc + repository2.totalCost,
    0
  );

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

  const handleGlobalCheckboxClick = () => {
    let isEveryCheckboxActive = true;
    checkedRepositories.forEach((repository) => {
      if (!repository.checked) {
        isEveryCheckboxActive = false;
      }
    });

    if (isEveryCheckboxActive && !globalCheckbox) {
      setGlobalCheckbox(!globalCheckbox);
    } else {
      setCheckedRepositories(
        checkedRepositories.map((repository) => {
          return {
            repositoryName: repository.repositoryName,
            checked: !isEveryCheckboxActive,
          };
        })
      );
      setGlobalCheckbox(!isEveryCheckboxActive);
    }
  };

  return (
    <GridItem>
      <StyledTable>
        <Grid>
          <GridItem xs={6}>
            {costPerRepository.map((repository, index) => {
              if (checkedRepositories.length === costPerRepository.length) {
                return (
                  <LeftTableRow key={index}>
                    <label>
                      <Checkbox
                        checked={checkedRepositories[index].checked}
                        onChange={() => {
                          let isOneCheckBoxInactive = false;
                          setCheckedRepositories(
                            checkedRepositories.map((item, position) => {
                              let isItemChecked;
                              if (index === position) {
                                isItemChecked = !item.checked;
                              } else {
                                isItemChecked = item.checked;
                              }
                              if (!isItemChecked) {
                                isOneCheckBoxInactive = true;
                              }
                              return {
                                checked: isItemChecked,
                                repositoryName: item.repositoryName,
                              };
                            })
                          );
                          if (isOneCheckBoxInactive) {
                            setGlobalCheckbox(false);
                          }
                        }}
                      />
                    </label>
                    <TableEntry key={index}>
                      <ColorIcon
                        repositoryName={repository.repositoryName}
                        colorContext={colorsPerRepositoryName}
                      >
                        ⬤{" "}
                      </ColorIcon>
                      {repository.repositoryName}
                    </TableEntry>
                  </LeftTableRow>
                );
              }
            })}
            <LeftTableRow>
              <label>
                <Checkbox
                  checked={globalCheckbox}
                  onChange={() => handleGlobalCheckboxClick()}
                />
              </label>
              <TableEntry>Total:</TableEntry>
            </LeftTableRow>
          </GridItem>
          <GridItem xs={6}>
            {costPerRepository.map((repository, index) => {
              return (
                <TableValue key={index}>{`${
                  Math.round(repository.totalCost * 100) / 100
                } $`}</TableValue>
              );
            })}
            <TableValue>{Math.round(total * 100) / 100} $</TableValue>
          </GridItem>
        </Grid>
      </StyledTable>
    </GridItem>
  );
};
