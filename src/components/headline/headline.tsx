import React from "react";
import styled from "styled-components";

const StyledHeadline = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 72px;
  line-height: 110%;
`;

export const Headline = (): JSX.Element => {
  return (
    <>
      {/*TODO: Add satellytes symbol*/}
      <StyledHeadline>GitHub Report</StyledHeadline>
    </>
  );
};
