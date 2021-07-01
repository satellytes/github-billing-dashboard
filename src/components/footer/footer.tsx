import React from "react";
import styled from "styled-components";
import { Paragraph } from "../style/typography";

const StyledFooter = styled.div`
  padding: 24px 24px 80px 24px;
  margin-top: 160px;
  text-align: right;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
`;

const FooterText = styled(Paragraph)`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <FooterText>
        developed by{" "}
        <FooterLink href="https://satellytes.com/" target="_blank">
          Satellytes.com
        </FooterLink>
      </FooterText>
    </StyledFooter>
  );
};
