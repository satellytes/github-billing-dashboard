import React, { useContext } from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { getCostPerRepository } from "../../util/group-entries";
import { Grid, GridItem, up } from "../grid/grid";
import styled from "styled-components";
import { WidgetContext } from "../context/widget-context";

interface RepositoryTableProps {
  csvData: UsageReportEntry[];
}

const StyledTable = styled.div`
  margin-top: 24px;
`;

const TableEntry = styled.p`
  margin-bottom: 8px;
`;

const TableLink = styled.a`
  display: block;
  text-decoration: none;
  color: white;
  margin-bottom: 8px;

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

export const RepositoryTable = ({
  csvData,
}: RepositoryTableProps): JSX.Element => {
  const { activeMonth } = useContext(WidgetContext);
  const costPerRepository = activeMonth.monthName
    ? getCostPerRepository(activeMonth.data)
    : getCostPerRepository(csvData);
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
              return isLink ? (
                <TableLink
                  href={`https://github.com/${repository.repositoryName}`}
                  key={index}
                >
                  {repository.repositoryName}
                </TableLink>
              ) : (
                <TableEntry key={index}>{repository.repositoryName}</TableEntry>
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
