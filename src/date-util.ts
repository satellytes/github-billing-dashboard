import { lightFormat } from "date-fns";
import { UsageReportEntry } from "./csv-reader";

export const getPeriodOfTimeString = (csvData: UsageReportEntry[]): string => {
  return `${lightFormat(
    new Date(csvData[0].date),
    "dd.MM.yyyy"
  )} bis ${lightFormat(
    new Date(csvData[csvData.length - 1].date),
    "dd.MM.yyyy"
  )}`;
};
