import {createContext} from "react";
import {UsageReportEntry} from "../csv-reader";


export const WidgetContext = createContext({
    activeMonth: {monthName: "", data: []},
    setActiveMonth: (month: string, data: UsageReportEntry[]) => {}
})

