import React, { RefObject } from "react";
import { GridItem } from "../grid/grid";
import { Subheading } from "../style/typography";

interface ChartContentHeadlineProps {
  refProp: RefObject<HTMLHeadingElement>;
}

export const ChartContentHeadline = ({
  refProp,
}: ChartContentHeadlineProps): JSX.Element => {
  return (
    <GridItem>
      <Subheading ref={refProp}>Overview</Subheading>
    </GridItem>
  );
};
