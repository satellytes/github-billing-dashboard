import React from "react";
import rectangleSVG from "./rectangle.svg";
import styled from "styled-components";

const IntroductionSentence = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
  width: 66%;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const Explanation = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  width: 66%;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const FlowChart = styled.div`
  display: flex;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const FlowChartRectangle = styled.div`
  margin-right: 8px;
  padding: 0;
  @media (max-width: 576px) {
    width: 80%;
  }
`;

const FlowChartRectangleSVG = styled.img`
  width: 100%;
`;

const InnerFlowChartDiv = styled.div`
  position: absolute;
  padding: 8px;
  width: 22%;

  @media (max-width: 576px) {
    width: 70%;
  }
`;

const FlowChartHeadline = styled.h1`
  margin: 0;
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
`;

export const StartScreen = (): JSX.Element => {
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
      <FlowChart>
        <FlowChartRectangle>
          <InnerFlowChartDiv>
            <FlowChartHeadline>1</FlowChartHeadline>
            <FlowChartDescription>
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet.{" "}
            </FlowChartDescription>
          </InnerFlowChartDiv>
          <FlowChartRectangleSVG src={rectangleSVG} />
        </FlowChartRectangle>

        <FlowChartRectangle>
          <InnerFlowChartDiv>
            <FlowChartHeadline>2</FlowChartHeadline>
            <FlowChartDescription>
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet.{" "}
            </FlowChartDescription>
          </InnerFlowChartDiv>
          <FlowChartRectangleSVG src={rectangleSVG} />
        </FlowChartRectangle>

        <FlowChartRectangle>
          <InnerFlowChartDiv>
            <FlowChartHeadline>3</FlowChartHeadline>
            <FlowChartDescription>
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet.{" "}
            </FlowChartDescription>
          </InnerFlowChartDiv>
          <FlowChartRectangleSVG src={rectangleSVG} />
        </FlowChartRectangle>
      </FlowChart>
    </>
  );
};
