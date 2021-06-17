import React from "react";
import { UsageReportEntry } from "../../util/csv-reader";
import { getCostPerRepository } from "../../util/group-entries";
import { Grid, GridItem } from "../grid/grid";
import styled from "styled-components";

interface RepositoryTableProps {
  csvData: UsageReportEntry[];
}

const TableEntry = styled.p`
  //TODO table styling
`;

export const RepositoryTable = ({
  csvData,
}: RepositoryTableProps): JSX.Element => {
  const costPerRepository = getCostPerRepository(csvData);
  return (
    <GridItem>
      <Grid>
        <GridItem xs={6}>
          {costPerRepository.map((repository, index) => {
            return (
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
    </GridItem>
  );
};
