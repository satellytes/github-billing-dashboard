import React from "react";
import styled from "styled-components";

const StyledHeadline = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 72px;
  line-height: 79px;
  margin: 254px 0 0 0;
  grid-column: 1/13;
`;

export const Headline = (): JSX.Element => {
  return (
    <>
      {/*TODO: Add satellytes symbol*/}
      <StyledHeadline>GitHub Report</StyledHeadline>
    </>
  );
};
