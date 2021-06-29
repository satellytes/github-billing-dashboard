import React from "react";
import styled from "styled-components";
import { Grid, GridItem, up } from "../grid/grid";
import GithubPersonalSettings from "../../assets/github-personal-1-settings.png";
import GithubPersonalBillingAndPlans from "../../assets/github-personal-2-billing-and-plans.png";
import GihtubPersonalGetUsageReport from "../../assets/github-personal-3-get-usage-report.png";
import { Subline, Paragraph } from "../style/typography";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const FlowChartRectangle = styled(GridItem)`
  margin-bottom: 24px;
  padding: 20px 20px 40px 20px;
  background: rgba(122, 143, 204, 0.3);
  clip-path: polygon(100% 0, 100% 94%, 50% 100%, 0 94%, 0 0);

  ${`${up("sm")}{
    clip-path: polygon(0% 0%, 94% 0, 100% 50%, 94% 100%, 0% 100%); 
    padding: 20px 40px 20px 20px;
    margin-right: 24px;
    margin-bottom: 0
   }`}
  &:last-child {
    clip-path: none;
    padding: 20px;
    margin-bottom: 0;
  }
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

const imageZoomProps = {
  overlayBgColorEnd: "rgba(255, 255, 255, 0.3)",
  zoomMargin: 100,
};

export const StartDescription = (): JSX.Element => {
  return (
    <GridItem>
      <Grid>
        <GridItem md={7}>
          <Paragraph>
            Github provides a CSV file with detailed information about your
            costs. Reading and analyzing this CSV can be cumbersome, which is
            why we created this dashboard. Just add you CSV file and see the
            cost nicely visualized and aggregated.
          </Paragraph>
          <Paragraph>
            No data gets uploaded to any servers. The CSV file is just stored in
            your browser which only you can access.
          </Paragraph>
          <Subline>How to get your CSV file</Subline>
        </GridItem>
        <GridItem md={4} />
        <FlowChartRectangle xs={12} sm={4}>
          <FlowChartHeadline>1</FlowChartHeadline>
          <FlowChartDescription>
            Go either to your personal or organization &quot;Settings&quot;
          </FlowChartDescription>
          <Zoom {...imageZoomProps}>
            <FlowChartImage src={GithubPersonalSettings} alt="" />
          </Zoom>
        </FlowChartRectangle>
        <FlowChartRectangle xs={12} sm={4}>
          <FlowChartHeadline>2</FlowChartHeadline>
          <FlowChartDescription>
            Click on &quot;Billing & plans&quot;.
          </FlowChartDescription>
          <Zoom {...imageZoomProps}>
            <FlowChartImage src={GithubPersonalBillingAndPlans} alt="" />
          </Zoom>
        </FlowChartRectangle>

        <FlowChartRectangle xs={12} sm={4}>
          <FlowChartHeadline>3</FlowChartHeadline>
          <FlowChartDescription>
            Click on &quot;Get usage report&quot;. You will now receive an email
            with the CSV file that you can add here.
          </FlowChartDescription>
          <Zoom {...imageZoomProps}>
            <FlowChartImage src={GihtubPersonalGetUsageReport} alt="" />
          </Zoom>
        </FlowChartRectangle>
      </Grid>
    </GridItem>
  );
};
