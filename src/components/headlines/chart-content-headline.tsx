import React, { RefObject } from "react";
import { GridItem } from "../grid/grid";
import styled from "styled-components";

const StyledSubheading = styled.h3`
  margin-top: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 24px;
`;

interface ChartContentHeadlineProps {
  refProp: RefObject<HTMLHeadingElement>;
}

export const ChartContentHeadline = ({
  refProp,
}: ChartContentHeadlineProps): JSX.Element => {
  return (
    <GridItem>
      <StyledSubheading ref={refProp}>Overview</StyledSubheading>
    </GridItem>
  );
};
