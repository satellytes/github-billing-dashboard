import { createGlobalStyle } from "styled-components";
import CocoGothicRegularTFF from "./fonts/Coco-Gothic-Regular-TTF.ttf";
import CocoGothicBoldTFF from "./fonts/Coco-Gothic-Bold-TTF.ttf";
import CocoGothicHeavyTFF from "./fonts/Coco-Gothic-Heavy-TTF.ttf";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Coco Gothic";
    src: url(${CocoGothicRegularTFF}) format("truetype");
    font-weight: normal;
  }

  @font-face {
    font-family: "Coco Gothic";
    src: url(${CocoGothicBoldTFF}) format("truetype");
    font-weight: bold;
  }

  @font-face {
    font-family: "Coco Gothic";
    src: url(${CocoGothicHeavyTFF}) format("truetype");
    font-weight: 900;
  }
  
  body {
    margin: 0;
    font-family: "Coco Gothic",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #202840;
    color: #FFF;
  }
  
  h1, h2, p, a {
    margin: 0;
    padding: 0;
  }
`;
