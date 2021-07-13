import React from "react";
import styled from "styled-components";
import GithubLogoPNG from "../../assets/GitHub-Mark-Light-64px.png";
import { Swoosh } from "../../assets/swoosh";
import { up } from "../grid/grid";

const StyledHeader = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 16px 15px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${() => `
    ${up("md")} {
      padding: 18px 24px 15px 24px
    }
  `};
`;

const SatellytesLogo = styled.div``;

const SatellytesLogoText = styled.a`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 31px;
  cursor: pointer;
  text-decoration: none;
  color: white;
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
        <SatellytesLogoText href={"https://satellytes.com/"} target={"_blank"}>
          Satellytes
        </SatellytesLogoText>
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
