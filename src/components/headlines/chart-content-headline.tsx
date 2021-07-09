import React, { RefObject } from "react";
import { GridItem } from "../grid/grid";
import { Subheading } from "../style/typography";
import styled from "styled-components";

interface ChartContentHeadlineProps {
  refProp: RefObject<HTMLHeadingElement>;
}

const StyledSubheading = styled(Subheading)`
  margin-top: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
`;

export const ChartContentHeadline = ({
  refProp,
}: ChartContentHeadlineProps): JSX.Element => {
  return (
    <GridItem>
      <StyledSubheading ref={refProp}>Overview</StyledSubheading>
    </GridItem>
  );
};
