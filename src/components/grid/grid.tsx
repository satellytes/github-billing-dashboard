import styled from "styled-components";

type GridItemSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface GridItemProps {
  xs?: GridItemSize;
  sm?: GridItemSize;
  md?: GridItemSize;
  lg?: GridItemSize;
  xl?: GridItemSize;
}

interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

const breakpoints = {
  xs: "0px",
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
};

export const GridItem = styled.div<GridItemProps>`
  grid-column-start: span ${(props) => props.xs || 12};

  ${`@media (min-width: ${breakpoints.md})`} {
  }

  ${(props) =>
    props.sm &&
    `
    ${up("sm")} {
      grid-column-start: span ${props.sm};
    }
  `};
  ${(props) =>
    props.md &&
    `
    ${up("md")} {
      grid-column-start: span ${props.md};
    }
  `};
  ${(props) =>
    props.lg &&
    `
    ${up("lg")} {
      grid-column-start: span ${props.lg};
    }
  `};
  ${(props) =>
    props.xl &&
    `
    ${up("xl")} {
      grid-column-start: span ${props.xl}
    }
  `};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

export const up = (breakpoint: keyof Breakpoints): string => `
    @media (min-width: ${breakpoints[breakpoint]})
  `;
