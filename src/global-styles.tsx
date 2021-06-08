import { createGlobalStyle } from "styled-components";
import CocoGothicRegularTFF from "./fonts/Coco-Gothic-Regular-TTF.ttf";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Coco Gothic Regular";
    src: url(${CocoGothicRegularTFF}) format("truetype");
  }
  body {
    margin: 0;
    //font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    //"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    //sans-serif;
    font-family: "Coco Gothic Regular", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #202840;
    color: #FFF;
  }
`;
