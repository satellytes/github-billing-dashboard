import styled from "styled-components";

export const Title = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 110%;
`;

export const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  width: 66%;
`;

export const StyledFileInput = styled.div`
  background: rgba(122, 143, 204, 0.3);
  border: 1px solid rgba(122, 143, 204, 0.3);
  border-radius: 4px;
  padding: 30px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-color: white;
  }
`;
