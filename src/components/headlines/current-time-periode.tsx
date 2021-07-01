import React, { RefObject } from "react";
import { GridItem } from "../grid/grid";
import { Subline } from "../style/typography";

interface CurrentTimePeriodeProps {
  refProp: RefObject<HTMLHeadingElement>;
}

export const CurrentTimePeriode = ({
  refProp,
}: CurrentTimePeriodeProps): JSX.Element => {
  return (
    <GridItem>
      <Subline ref={refProp}>Overview</Subline>
    </GridItem>
  );
};
