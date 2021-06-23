import React, { useContext } from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { getCostPerRepository } from "../../util/group-entries";
import { Grid, GridItem } from "../grid/grid";
import styled from "styled-components";
import { WidgetContext } from "../context/widget-context";

interface RepositoryTableProps {
  csvData: UsageReportEntry[];
}

const TableLink = styled.a`
  display: block;
  text-decoration: none;
  color: white;
  margin-bottom: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledTable = styled.div`
  margin-top: 24px;
`;

const TableEntry = styled.p`
  margin-bottom: 8px;
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
                <TableEntry key={index}>{`${
                  Math.round(repository.totalCost * 100) / 100
                }$`}</TableEntry>
              );
            })}
          </GridItem>
        </Grid>
      </StyledTable>
    </GridItem>
  );
};
