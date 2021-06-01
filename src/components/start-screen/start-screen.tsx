import React from "react";
import rectangleSVG from "./rectangle.svg";
import styled from "styled-components";

const backgroundRectangle = (
  <svg
    width="312"
    height="283"
    viewBox="0 0 312 283"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 4C0 1.79086 1.79086 0 4 0H288.526C290.518 0 292.207 1.46695 292.486 3.44019L311.921 140.94C311.973 141.312 311.973 141.688 311.921 142.06L292.486 279.56C292.207 281.533 290.518 283 288.526 283H4C1.79086 283 0 281.209 0 279V4Z"
      fill="#7A8FCC"
      fillOpacity="0.3"
    />
  </svg>
);

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
  width: 100%;
`;

const FlowChartRectangle = styled.div`
  width: 33%;
  margin-right: 8px;
`;

const InnerFlowChartDiv = styled.div`
  position: absolute;
  width: 33%;
`;

const FlowChartHeadline = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 110%;
`;

const FlowChartDescription = styled.p`
  width: 33%;
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
          <img src={rectangleSVG} />
        </FlowChartRectangle>

        <FlowChartRectangle>
          <InnerFlowChartDiv>
            <FlowChartHeadline>2</FlowChartHeadline>
            <FlowChartDescription>
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet.{" "}
            </FlowChartDescription>
          </InnerFlowChartDiv>
          <img src={rectangleSVG} />
        </FlowChartRectangle>

        <FlowChartRectangle>
          <InnerFlowChartDiv>
            <FlowChartHeadline>3</FlowChartHeadline>
            <FlowChartDescription>
              Integer posuere erat a ante venenatis dapibus posuere velit
              aliquet.{" "}
            </FlowChartDescription>
          </InnerFlowChartDiv>
          <img src={rectangleSVG} />
        </FlowChartRectangle>
      </FlowChart>
    </>
  );
};
