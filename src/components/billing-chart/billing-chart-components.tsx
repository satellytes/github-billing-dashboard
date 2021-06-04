import { Tooltip } from "recharts";
import { CSSProperties } from "react";
import { UsageReportDay, UsageReportWeek } from "../../group-entries";

export interface BillingChartProps {
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
  repositoryNames: string[];
  isDataFromWidget: boolean;
  entriesGroupedPerDay: UsageReportDay[];
  entriesGroupedPerWeek: UsageReportWeek[];
}

//Setting the generics for Tooltip
export class CustomTooltip extends Tooltip<number, string> {}

export const tooltipLabelStyle: CSSProperties = {
  color: "black",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "110%",
  marginBottom: "4px",
};

export const tooltipItemStyle: CSSProperties = {
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "12px",
  lineHeight: "110%",
};

export const tooltipContentStyle: CSSProperties = {
  borderRadius: "4px",
  borderBlockColor: "white",
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
