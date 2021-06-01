import { UsageReportEntry } from "../../csv-reader";
import { Tooltip } from "recharts";

export interface BillingChartProps {
  csvData: UsageReportEntry[];
  groupedBy: "daily" | "weekly";
  maxValueOfYAxis: number;
  repositoryNames: string[];
  isDataFromWidget: boolean;
}

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

//Setting the generics for Tooltip
export class CustomTooltip extends Tooltip<number, string> {}
