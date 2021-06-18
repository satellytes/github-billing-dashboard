import { Tooltip } from "recharts";
import { CSSProperties } from "react";
import { UsageReportDay, UsageReportWeek } from "../../util/group-entries";

export interface BillingChartProps {
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
  repositoryNames: string[];
  entriesGroupedPerDay: UsageReportDay[];
  entriesGroupedPerWeek: UsageReportWeek[];
}

export const removeZeroDollarEntries = (
  value: number,
  name: string,
  props: { value: number }
): [string | null, string | null, { value: number } | null] => {
  if (props.value === 0) {
    return [null, null, null];
  } else {
    return [`${value}$`, name, props];
  }
};

//Setting the generics for Tooltip
export class CustomTooltip extends Tooltip<number, string> {}

export const tooltipLabelStyle: CSSProperties = {
  color: "black",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "13px",
  marginBottom: "10px",
};

export const tooltipItemStyle: CSSProperties = {
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "13px",
  marginBottom: "4px",
  padding: 0,
};

export const tooltipContentStyle: CSSProperties = {
  borderRadius: "4px",
  borderBlockColor: "white",
  padding: "12px",
};

export const colors = [
  "#233666",
  "#96ADEA",
  "#4F79E6",
  "#414C66",
  "#3D5EB3",
  "#233666",
  "#96ADEA",
  "#4F79E6",
  "#414C66",
  "#3D5EB3",
];
