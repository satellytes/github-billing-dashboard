import React from "react";
import styled from "styled-components";
import { Payload } from "recharts/types/component/DefaultTooltipContent";

export const TooltipText = styled.p`
  font-size: 14px;
  color: #202840;
`;

const TooltipValue = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: #202840;
  margin-left: 12px;
`;

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const TooltipDot = styled.span<{ repositoryColor?: string }>`
  color: ${(props: { repositoryColor?: string }) => `${props.repositoryColor}`};
  font-size: 8px;
  vertical-align: 2px;
  margin-right: 8px;
`;

interface TooltipEntryProps {
  tooltipEntry: Payload<number, string>;
}

export const TooltipEntry = ({
  tooltipEntry,
}: TooltipEntryProps): JSX.Element => {
  return (
    <TooltipRow>
      <TooltipText>
        <TooltipDot repositoryColor={tooltipEntry.color}>⬤</TooltipDot>
        {tooltipEntry.name}
      </TooltipText>
      <TooltipValue>{tooltipEntry.value?.toFixed(2)} $</TooltipValue>
    </TooltipRow>
  );
};
