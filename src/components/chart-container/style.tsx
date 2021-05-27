// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styled from "styled-components";

export const ChartDiv = styled.div`
  background: linear-gradient(
    180deg,
    rgba(122, 143, 204, 0) 0%,
    rgba(122, 143, 204, 0.3) 100%
  );
  border-radius: 4px;
  margin: 32px 16px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;

const Button = styled.button`
  background: ${(props: { isActive: boolean }) =>
    props.isActive ? "#668cff" : "rgba(255, 255, 255, 0.1)"};
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  color: white;
`;

export const LeftToggleButton = styled(Button)`
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

export const RightToggleButton = styled(Button)`
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
`;
