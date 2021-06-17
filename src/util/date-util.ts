import { lightFormat } from "date-fns";
import { UsageReportEntry } from "./csv-reader";

export const getPeriodOfTimeString = (csvData: UsageReportEntry[]): string => {
  return `${lightFormat(
    new Date(csvData[0].date),
    "dd.MM.yyyy"
  )} to ${lightFormat(
    new Date(csvData[csvData.length - 1].date),
    "dd.MM.yyyy"
  )}`;
};

export const isStringDateValue = (possibleDateValue: string): boolean => {
  return !!Date.parse(possibleDateValue);
};

export const dayOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
