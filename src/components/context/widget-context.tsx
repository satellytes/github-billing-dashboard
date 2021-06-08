import { createContext } from "react";
import { UsageReportEntry } from "../../util/csv-reader";

interface WidgetContextType {
  activeMonth: { monthName: string; data: UsageReportEntry[] };
  setActiveMonth: (month: string, data: UsageReportEntry[]) => void;
}

export const WidgetContext = createContext<WidgetContextType>({
  activeMonth: { monthName: "", data: [] },
  setActiveMonth: () => undefined,
});
