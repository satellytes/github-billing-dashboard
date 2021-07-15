import React from "react";
import styled from "styled-components";
import { Grid, GridItem, up } from "../grid/grid";
import GithubPersonalSettings from "../../assets/github-personal-1-settings.png";
import GithubPersonalBillingAndPlans from "../../assets/github-personal-2-billing-and-plans.png";
import GihtubPersonalGetUsageReport from "../../assets/github-personal-3-get-usage-report.png";
import { Subheading, Paragraph } from "../style/typography";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const StyledSubheading = styled(Subheading)`
  margin-top: 120px;
  margin-bottom: 32px;
`;

const FlowChartContainer = styled(Grid)`
  column-gap: 24px;
`;
const FlowChartItem = styled(GridItem)`
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(122, 143, 204, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${`${up("sm")}{
    margin-bottom: 0;
    height: 320px;
   }`}

  ${`${up("md")}{
    height: 400px;
   }`}
`;

const FlowChartTextContent = styled.div``;

const FlowChartHeadline = styled.p`
  margin-bottom: 8px;
  font-style: normal;
  font-weight: 900;
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
            Reading and analyzing this CSV can be cumbersome, which is why we
            created this dashboard. Just add you CSV file and see the cost
            nicely visualized and aggregated. No data gets uploaded to any
            servers. The CSV file is just stored in your browser which only you
            can access.
          </Paragraph>
          <StyledSubheading>How to get your CSV file</StyledSubheading>
        </GridItem>
        <GridItem md={4} />
      </Grid>
      <FlowChartContainer>
        <FlowChartItem xs={12} sm={4}>
          <FlowChartTextContent>
            <FlowChartHeadline>1</FlowChartHeadline>
            <FlowChartDescription>
              Go either to your personal or organization &quot;Settings&quot;
            </FlowChartDescription>
          </FlowChartTextContent>
          <Zoom {...imageZoomProps}>
            <FlowChartImage src={GithubPersonalSettings} alt="" />
          </Zoom>
        </FlowChartItem>
        <FlowChartItem xs={12} sm={4}>
          <FlowChartTextContent>
            <FlowChartHeadline>2</FlowChartHeadline>
            <FlowChartDescription>
              Click on &quot;Billing & plans&quot;.
            </FlowChartDescription>
          </FlowChartTextContent>
          <Zoom {...imageZoomProps}>
            <FlowChartImage src={GithubPersonalBillingAndPlans} alt="" />
          </Zoom>
        </FlowChartItem>

        <FlowChartItem xs={12} sm={4}>
          <FlowChartTextContent>
            <FlowChartHeadline>3</FlowChartHeadline>
            <FlowChartDescription>
              Click on &quot;Get usage report&quot;. You will now receive an
              email with the CSV file that you can add here.
            </FlowChartDescription>
          </FlowChartTextContent>
          <Zoom {...imageZoomProps}>
            <FlowChartImage src={GihtubPersonalGetUsageReport} alt="" />
          </Zoom>
        </FlowChartItem>
      </FlowChartContainer>
    </GridItem>
  );
};
