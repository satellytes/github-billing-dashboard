import styled from "styled-components";

export const StyledWidget = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  background: rgba(122, 143, 204, 0.3);

  border: ${(props: { isActive: boolean }) =>
    props.isActive ? "1px solid white" : "1px solid rgba(122, 143, 204, 0.3)"};
  padding: 8px 4px;
  border-radius: 4px;

  &:hover {
    border-color: white;
  }
`;

export const WidgetDescription = styled.div`
  margin-right: 8px;
`;

export const WidgetMonth = styled.h2`
  margin-top: 0;
  font-style: normal;
  font-weight: 900;
  font-size: 12px;
  line-height: 150%;
  text-transform: uppercase;
`;

export const WidgetValue = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
  text-transform: uppercase;
`;

export const Arrow = styled.span`
  color: ${(props: { isMoreExpensiveThanPreviousMonth: boolean }) =>
    props.isMoreExpensiveThanPreviousMonth ? "#DC052D" : "#75F0C7"};
`;
