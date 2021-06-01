import React from "react";
//import rectangleSVG from "./rectangle.svg";
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
    </>
  );
};
