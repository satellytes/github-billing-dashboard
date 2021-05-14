import {UsageReportEntry} from "./csv-reader";
import {getISOWeek, lastDayOfWeek, lightFormat, startOfWeek} from 'date-fns'

interface UsageReportDay {
    day: string; // iso date
    totalPrice: number; // for the charts total value
    entries: UsageReportEntry[];
}

export const groupEntriesPerDay = (csvData: UsageReportEntry[]): UsageReportDay[] => {
    return csvData.reduce((acc: UsageReportDay[], obj) => {
        let indexOfEntryForCurrentDate: number = 0;
        const currentDate = new Date(obj.date).toISOString()

        //Is the current date already in acc?
        if (!(acc.find((objectsInAcc: UsageReportDay, index) => {
            indexOfEntryForCurrentDate = index
            return objectsInAcc.day === currentDate
        }))) {
            const newEntry: UsageReportDay = {
                day: currentDate,
                totalPrice: obj.totalPrice,
                entries: [obj]
            }
            acc.push(newEntry)
        }else {
            acc[indexOfEntryForCurrentDate].entries.push(obj)
            acc[indexOfEntryForCurrentDate].totalPrice = acc[indexOfEntryForCurrentDate].totalPrice + obj.totalPrice
        }
        return acc;
    }, []);
}



interface UsageReportWeek {
    week: string; // a.e.: "12.5. - 19.5."
    from: string; // iso date
    to: string; // iso date
    weekNumber: number;
    totalPrice: number; // for the charts total value
    entries: UsageReportEntry[];
}

export const groupEntriesPerWeek = (csvData: UsageReportEntry[]): UsageReportWeek[] => {
    return csvData.reduce((acc: UsageReportWeek[], obj) => {
        let indexOfEntryForCurrentDate: number = 0;
        const currentDate = new Date(obj.date)
        const currentWeekNumber = getISOWeek(currentDate)

        //Is the current date already in acc?
        if (!(acc.find((objectsInAcc: UsageReportWeek, index) => {
            indexOfEntryForCurrentDate = index
            return objectsInAcc.weekNumber === currentWeekNumber
        }))) {
            const firstDayOfTheWeek = startOfWeek(currentDate)
            const lastDayOfTheWeek = lastDayOfWeek(currentDate)

            const newEntry: UsageReportWeek = {
                week: `${lightFormat(firstDayOfTheWeek, 'dd.MM.')} - ${lightFormat(lastDayOfTheWeek, 'dd.MM.')}`,
                from: firstDayOfTheWeek.toISOString(),
                to: lastDayOfTheWeek.toISOString(),
                weekNumber: currentWeekNumber,
                totalPrice: obj.totalPrice,
                entries: [obj]
            }

            acc.push(newEntry)
        }else {
            acc[indexOfEntryForCurrentDate].entries.push(obj)
            acc[indexOfEntryForCurrentDate].totalPrice = acc[indexOfEntryForCurrentDate].totalPrice + obj.totalPrice
        }
        return acc;
    }, []);
}
