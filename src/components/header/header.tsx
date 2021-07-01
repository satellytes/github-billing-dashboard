import React from "react";
import styled from "styled-components";
import GithubLogoPNG from "../../assets/GitHub-Mark-Light-64px.png";

const StyledHeader = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 24px 14px 24px;
  display: flex;
  justify-content: space-between;
`;

const SatellytesLogo = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
`;

const GithubLogo = styled.img`
  width: 32px;
  cursor: pointer;
`;

export const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <SatellytesLogo>Satellytes</SatellytesLogo>
      <a
        href={"https://github.com/satellytes/github-billing-dashboard"}
        target={"_blank"}
        rel="noreferrer"
      >
        <GithubLogo src={GithubLogoPNG} />
      </a>
    </StyledHeader>
  );
};
