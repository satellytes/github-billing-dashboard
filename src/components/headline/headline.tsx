import React from "react";
import styled from "styled-components";
import { GridItem, up } from "../grid/grid";

const StyledHeadline = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 56px;
  line-height: 79px;
  margin-top: 254px;
  ${() => `
    ${up("md")} {
      font-size: 72px
    }
  `};
`;

export const Headline = (): JSX.Element => {
  return (
    <>
      {/*TODO: Add satellytes symbol*/}
      <GridItem>
        <StyledHeadline>GitHub CSV Billing Dashboard</StyledHeadline>
      </GridItem>
    </>
  );
};
