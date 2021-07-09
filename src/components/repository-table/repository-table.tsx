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

const StyledHeading = styled.h3`
  font-weight: bold;
  font-size: 24px;
  margin-top: 88px;
  margin-bottom: 32px;
`;

const StyledTable = styled.div`
  margin-top: 24px;
`;

const LeftTableRow = styled.div`
  display: flex;
`;

const Separator = styled.div<{ isTotalEntry?: boolean }>`
  border-top: ${(props: { isTotalEntry?: boolean }) =>
    props.isTotalEntry
      ? "1px solid rgba(255, 255, 255, 1);"
      : "1px solid rgba(255, 255, 255, 0.1);"};

  ${(props: { isTotalEntry?: boolean }) =>
    props.isTotalEntry
      ? "border-bottom: 1px solid rgba(255, 255, 255, 1)"
      : ""};

  padding: 18px 12px;
`;

const TableEntry = styled.p`
  margin-left: 12px;
  font-size: 14px;
  margin-top: 2px;
`;

const TableValue = styled.p`
  text-align: right;
  ${`${up("sm")}{
      text-align: left;
   }`}
  font-size: 14px;
  margin-top: 2px;
`;

const ColorIcon = styled.span<{
  repositoryName: string;
  colorContext: RepositoryColorType[];
}>`
  font-size: 8px;
  margin-right: 6px;
  vertical-align: 3px;
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
  width: 20px;
  height: 20px;
  background: rgba(122, 143, 204, 0.3);
  border-radius: 4px;
  transition: all 150ms;
  cursor: pointer;

  &:hover {
    background: rgba(122, 143, 204, 0.5);
  }

  text-align: center;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
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
        <Icon
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6.33333L3.46154 9L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
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
      <StyledHeading>Segments</StyledHeading>
      <StyledTable>
        {costPerRepository.map((repository, index) => {
          if (checkedRepositories.length === costPerRepository.length) {
            return (
              <Separator key={index}>
                <Grid>
                  <GridItem xs={5} md={4}>
                    <LeftTableRow>
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
                      <TableEntry>
                        <ColorIcon
                          repositoryName={repository.repositoryName}
                          colorContext={colorsPerRepositoryName}
                        >
                          ⬤
                        </ColorIcon>
                        {repository.repositoryName}
                      </TableEntry>
                    </LeftTableRow>
                  </GridItem>
                  <GridItem xs={7} md={8}>
                    <TableValue>{`${
                      Math.round(repository.totalCost * 100) / 100
                    } $`}</TableValue>
                  </GridItem>
                </Grid>
              </Separator>
            );
          }
        })}
        <Separator isTotalEntry={true}>
          <Grid>
            <GridItem xs={6}>
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
              <TableValue>{Math.round(total * 100) / 100} $</TableValue>
            </GridItem>
          </Grid>
        </Separator>
      </StyledTable>
    </GridItem>
  );
};
