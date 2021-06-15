import React from "react";
import styled from "styled-components";
import { GridItem, up } from "../grid/grid";
import GithubPersonalSettings from "../../assets/github-personal-1-settings.png";
import GithubPersonalBillingAndPlans from "../../assets/github-personal-2-billing-and-plans.png";
import GihtubPersonalGetUsageReport from "../../assets/github-personal-3-get-usage-report.png";

const Subline = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
  margin-top: 40px;
`;

const Text = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const FlowChartRectangle = styled.div`
  margin: 40px 24px 0 0;

  padding: 20px 20px 40px 20px;
  background: rgba(122, 143, 204, 0.3);

  ${(props: { isLastRectangle: boolean }) =>
    !props.isLastRectangle
      ? "clip-path: polygon(100% 0, 100% 94%, 50% 100%, 0 94%, 0 0)"
      : ""};
  ${(props: { isLastRectangle: boolean }) =>
    !props.isLastRectangle
      ? `
    ${up("sm")} {
      clip-path: polygon(0% 0%, 94% 0, 100% 50%, 94% 100%, 0% 100%);
      
    }
  `
      : ""};
  ${() => `
    ${up("sm")} {
        padding: 20px 40px 20px 20px;
    }
  `};
`;

const FlowChartHeadline = styled.h1`
  margin-bottom: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
`;

const FlowChartDescription = styled.p`
  margin-bottom: 16px;
  margin-top: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
`;

const FlowChartImage = styled.img`
  width: 100%;
`;

export const StartDescription = (): JSX.Element => {
  return (
    <>
      <GridItem md={7}>
        <Subline>Visualize your Github CSV Billing files</Subline>
        <Text>
          Github provides a CSV file with detailed information about your costs.
          Reading and analyzing this CSV can be cumbersome, which is why we
          created this dashboard. Just add you CSV file and see the cost nicely
          visualized and aggregated.
        </Text>
        <Text>
          No data gets uploaded to any servers. The CSV file is just stored in
          your browser which only you can access.
        </Text>
        <Subline>How to get your CSV file</Subline>
      </GridItem>
      <GridItem md={4} />
      <GridItem xs={11} sm={4}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/*@ts-ignore*/}
        <FlowChartRectangle isLastRectangle={false}>
          <FlowChartHeadline>1</FlowChartHeadline>
          <FlowChartDescription>
            Go either to your personal or organization &quot;Settings&quot;
          </FlowChartDescription>
          <FlowChartImage src={GithubPersonalSettings} alt="" />
        </FlowChartRectangle>
      </GridItem>
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle isLastRectangle={false}>
          <FlowChartHeadline>2</FlowChartHeadline>
          <FlowChartDescription>
            Click on &quot;Billing & plans&quot;.
          </FlowChartDescription>
          <FlowChartImage src={GithubPersonalBillingAndPlans} alt="" />
        </FlowChartRectangle>
      </GridItem>
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle isLastRectangle={true}>
          <FlowChartHeadline>3</FlowChartHeadline>
          <FlowChartDescription>
            Click on &quot;Get usage report&quot;. You will now receive an email
            with the CSV file that you can add here.
          </FlowChartDescription>
          <FlowChartImage src={GihtubPersonalGetUsageReport} alt="" />
        </FlowChartRectangle>
      </GridItem>
    </>
  );
};
