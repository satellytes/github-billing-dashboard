import {UsageReportEntry} from "./csv-reader";
import {
    getISOWeek,
    lastDayOfWeek,
    lightFormat,
    startOfWeek,
    format,
    getMonth,
    lastDayOfMonth,
    startOfMonth,
    getYear
} from 'date-fns'

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
        const currentFirstDayOfTheWeek = startOfWeek(currentDate)

        //Is the current date already in acc?
        if (!(acc.find((objectsInAcc: UsageReportWeek, index) => {
            indexOfEntryForCurrentDate = index
            return objectsInAcc.from === currentFirstDayOfTheWeek.toISOString()
        }))) {
            const firstDayOfTheWeek = startOfWeek(currentDate)
            const lastDayOfTheWeek = lastDayOfWeek(currentDate)

            const newEntry: UsageReportWeek = {
                week: `${lightFormat(firstDayOfTheWeek, 'dd.MM.')} - ${lightFormat(lastDayOfTheWeek, 'dd.MM.')}`,
                from: firstDayOfTheWeek.toISOString(),
                to: lastDayOfTheWeek.toISOString(),
                weekNumber: getISOWeek(currentDate),
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

export interface UsageReportMonth{
    monthName: string; // a.e.: "April 2020"
    month: number; // a.e. 4
    from: string; // iso date
    to: string; // iso date
    totalPrice: number; // for the charts total value
    entries: UsageReportEntry[];
}


export const groupEntriesPerMonth = (csvData: UsageReportEntry[]): UsageReportMonth[] => {
    // @ts-ignore
    return csvData.reduce((acc: UsageReportMonth[], obj) => {
        let indexOfEntryForCurrentDate: number = 0;
        const currentDate = new Date(obj.date)
        const currentStartOfMonth = startOfMonth(currentDate).toISOString()

        //Is the current date already in acc?
        if (!(acc.find((objectsInAcc: UsageReportMonth, index) => {
            indexOfEntryForCurrentDate = index
            return objectsInAcc.from === currentStartOfMonth
        }))) {
            const firstDayOfMonth = startOfMonth(currentDate)
            const lastDayOfTheMonth = lastDayOfMonth(currentDate)

            const newEntry: UsageReportMonth = {
                monthName: `${format(currentDate, 'LLLL')} ${getYear(currentDate)}`,
                month: getMonth(currentDate) + 1,
                from: firstDayOfMonth.toISOString(),
                to: lastDayOfTheMonth.toISOString(),
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


export const getPriceByRepositoryName = (repositoryName: string, currentEntries: UsageReportEntry[]) => {
    let priceByRepositoryName = 0
    currentEntries.forEach((entry) => {
        if(entry.repositorySlug === repositoryName){
            priceByRepositoryName += entry.totalPrice
        }
    })
    return Math.round(priceByRepositoryName * 100) / 100
}

export const getMaximumTotalPriceOfAllDays = (data: UsageReportEntry[]) => {
    const entriesGroupedPerDay = groupEntriesPerDay(data)
    return Math.ceil(Math.max.apply(Math, entriesGroupedPerDay.map((entry) => entry.totalPrice)))
}

export const getMaximumTotalPriceOfAllWeeks = (data: UsageReportEntry[]) => {
    const entriesGroupedPerWeek = groupEntriesPerWeek(data)
    return Math.ceil(Math.max.apply(Math, entriesGroupedPerWeek.map((entry) => entry.totalPrice)))
}