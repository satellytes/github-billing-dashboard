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
        <Subline>
          Hier ein kurzer Einführungssatz zum Tool integer posuere erat a ante
          venenatis
        </Subline>
        <Text>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas
          sed diam eget risus varius blandit sit amet non magna.
        </Text>
      </GridItem>
      <GridItem md={4} />
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle>
          <FlowChartHeadline>1</FlowChartHeadline>
          <FlowChartDescription>
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </FlowChartDescription>
          <PlaceholderForImage />
        </FlowChartRectangle>
      </GridItem>
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle>
          <FlowChartHeadline>2</FlowChartHeadline>
          <FlowChartDescription>
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </FlowChartDescription>
          <PlaceholderForImage />
        </FlowChartRectangle>
      </GridItem>
      <GridItem xs={11} sm={4}>
        <FlowChartRectangle>
          <FlowChartHeadline>3</FlowChartHeadline>
          <FlowChartDescription>
            Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </FlowChartDescription>
          <PlaceholderForImage />
        </FlowChartRectangle>
      </GridItem>
    </>
  );
};
