import React from "react";
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
`;

const Explanation = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  width: 66%;
`;

const FlowChart = styled.div`
  display: flex;
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
        {backgroundRectangle}
        {backgroundRectangle}
        {backgroundRectangle}
      </FlowChart>
    </>
  );
};
