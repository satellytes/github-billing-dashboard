import React from "react";
import styled from "styled-components";
import GithubLogoPNG from "../../assets/GitHub-Mark-Light-64px.png";
import { Swoosh } from "../../assets/swoosh";
import { up } from "../grid/grid";

const StyledHeader = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 16px 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${() => `
    ${up("md")} {
      padding: 18px 24px 14px 24px
    }
  `};
`;

const SatellytesLogo = styled.div``;

const SatellytesLogoText = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
`;

const HeaderSwoosh = styled(Swoosh)`
  position: absolute;
  width: 14px;
  margin-bottom: -7px;
`;

const GithubLogo = styled.img`
  width: 20px;
  cursor: pointer;
`;

export const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <SatellytesLogo>
        <HeaderSwoosh />
        <SatellytesLogoText>Satellytes</SatellytesLogoText>
      </SatellytesLogo>
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
