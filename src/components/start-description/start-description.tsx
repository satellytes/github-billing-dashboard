import React from "react";
import styled from "styled-components";

//TODO Remove Placeholder
const PlaceholderForImage = styled.div`
  background: rgba(122, 143, 204, 0.3);
  height: 142px;
  margin: 16px 40px 20px 20px;
`;

const EmptyDiv = styled.div`
  grid-column-start: span 4;
`;

const IntroductionSentence = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
  margin: 40px 0 0 0;
  grid-column: 1 / 9;
`;

const Explanation = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  margin: 32px 0 0 0;
  grid-column: 1 / 9;
`;

const FlowChartRectangle = styled.div`
  margin: 40px 24px 0 0;
  padding: 0;
  clip-path: polygon(0% 0%, 94% 0, 100% 50%, 94% 100%, 0% 100%);
  background: rgba(122, 143, 204, 0.3);
  grid-column-start: span 4;
`;

const FlowChartHeadline = styled.h1`
  margin: 20px 0 0 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
`;

const FlowChartDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  margin: 8px 40px 0 20px;
`;

export const StartDescription = (): JSX.Element => {
  return (
    <>
      <IntroductionSentence>
        Hier ein kurzer Einführungssatz zum Tool integer posuere erat a ante
        venenatis
      </IntroductionSentence>
      <Explanation>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas
        sed diam eget risus varius blandit sit amet non magna.
      </Explanation>
      <EmptyDiv />
      <FlowChartRectangle>
        <FlowChartHeadline>1</FlowChartHeadline>
        <FlowChartDescription>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </FlowChartDescription>
        <PlaceholderForImage />
      </FlowChartRectangle>

      <FlowChartRectangle>
        <FlowChartHeadline>2</FlowChartHeadline>
        <FlowChartDescription>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </FlowChartDescription>
        <PlaceholderForImage />
      </FlowChartRectangle>

      <FlowChartRectangle>
        <FlowChartHeadline>3</FlowChartHeadline>
        <FlowChartDescription>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        </FlowChartDescription>
        <PlaceholderForImage />
      </FlowChartRectangle>
    </>
  );
};
