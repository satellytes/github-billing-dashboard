import React from "react";
import { IntroductionSentence, Explanation } from "./style";

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
