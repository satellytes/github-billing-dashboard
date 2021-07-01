import React, { RefObject } from "react";
import { GridItem } from "../grid/grid";
import { Subline } from "../style/typography";

interface ChartContentHeadlineProps {
  refProp: RefObject<HTMLHeadingElement>;
}

export const ChartContentHeadline = ({
  refProp,
}: ChartContentHeadlineProps): JSX.Element => {
  return (
    <GridItem>
      <Subline ref={refProp}>Overview</Subline>
    </GridItem>
  );
};
