import React from "react";
import styled from "styled-components";
import { Swoosh } from "../../assets/swoosh";
import { GridItem, up } from "../grid/grid";

const HeadlineText = styled.h1`
  font-style: normal;
  font-weight: bold;
  font-size: 56px;
  line-height: 79px;
  margin-top: 0;
  margin-bottom: 40px;
  ${() => `
    ${up("md")} {
      font-size: 72px
    }
  `};
`;

const HeadlineSwoosh = styled(Swoosh)`
  position: relative;
  width: 36px;
  margin-top: 188px;
  margin-left: 4px;
  margin-bottom: -12px;
  ${() => `
    ${up("md")} {
      width: 48px;
      margin-bottom: 0;
    }
  `};
`;

const Subtitle = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
  margin-bottom: 32px;
`;

export const MainHeadline = (): JSX.Element => {
  return (
    <GridItem md={7}>
      <div>
        <HeadlineSwoosh />
        <HeadlineText>GitHub CSV Billing Dashboard</HeadlineText>
      </div>
      <Subtitle>
        Github provides a CSV file with detailed information about your costs.{" "}
      </Subtitle>
    </GridItem>
  );
};
