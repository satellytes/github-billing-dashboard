import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 24px 14px 24px;
`;

const Logo = styled.h1`
  margin-left: 24px;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
  cursor: pointer;
`;

export const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <Logo>Satellytes</Logo>
    </StyledHeader>
  );
};
