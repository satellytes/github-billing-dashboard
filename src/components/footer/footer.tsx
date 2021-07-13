import React from "react";
import styled from "styled-components";
import { Swoosh } from "../../assets/swoosh";

const StyledFooter = styled.div`
  padding: 400px 40px 40px 40px;
  margin-top: 160px;
  text-align: right;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  clip-path: polygon(
    0 16vw /* left top */,
    100% 0 /* right top */,
    100% 100% /* right bottom */,
    0% 100% /* left bottom */
  );
`;

const FooterSwoosh = styled(Swoosh)`
  position: absolute;
  width: 28px;
  margin-bottom: -7px;
  margin-left: 3px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-size: 48px;
  font-weight: bold;
`;

export const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <FooterSwoosh />
      <FooterLink href="https://satellytes.com/" target="_blank">
        Satellytes
      </FooterLink>
    </StyledFooter>
  );
};
