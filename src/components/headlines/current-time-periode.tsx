import React from "react";
import styled from "styled-components";
import { GridItem } from "../grid/grid";

const ChartHeadline = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
  margin-top: 80px;
`;

export const CurrentTimePeriode = (): JSX.Element => {
  return (
    <GridItem>
      <ChartHeadline>Overview</ChartHeadline>
    </GridItem>
  );
};
