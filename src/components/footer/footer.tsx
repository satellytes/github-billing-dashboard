import React from "react";
import styled from "styled-components";
import { Paragraph } from "../style/typography";

const StyledFooter = styled.div`
  padding: 20px 24px 14px 24px;
  margin-top: 188px;
  text-align: center;
`;

const FooterText = styled(Paragraph)`
  margin-bottom: 0;
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
          satellytes
        </FooterLink>
      </FooterText>
    </StyledFooter>
  );
};
