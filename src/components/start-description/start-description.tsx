import React from "react";
import styled from "styled-components";
import { GridItem } from "../grid/grid";

//TODO Remove Placeholder
const PlaceholderForImage = styled.div`
  background: rgba(122, 143, 204, 0.3);
  height: 142px;
  margin: 0;
`;

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
  padding: 20px 40px 20px 20px;
  clip-path: polygon(0% 0%, 94% 0, 100% 50%, 94% 100%, 0% 100%);
  background: rgba(122, 143, 204, 0.3);
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

export const StartDescription = (): JSX.Element => {
  return (
    <>
      <GridItem md={7}>
        <Subline>Visualize your Github CSV Billing files.</Subline>
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
      </GridItem>
      <GridItem md={4} />
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle>
          <FlowChartHeadline>1</FlowChartHeadline>
          <FlowChartDescription>
            Go to `&quot;Settings`&quot;.
          </FlowChartDescription>
          <PlaceholderForImage />
        </FlowChartRectangle>
      </GridItem>
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle>
          <FlowChartHeadline>2</FlowChartHeadline>
          <FlowChartDescription>
            Click on `&quot;Billing & plans`&quot;.
          </FlowChartDescription>
          <PlaceholderForImage />
        </FlowChartRectangle>
      </GridItem>
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle>
          <FlowChartHeadline>3</FlowChartHeadline>
          <FlowChartDescription>
            Click on `&quot;Get usage report`&quot;. You will now receive an
            email with the CSV file that you can add here.
          </FlowChartDescription>
          <PlaceholderForImage />
        </FlowChartRectangle>
      </GridItem>
    </>
  );
};
