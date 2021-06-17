import { UsageReportEntry } from "./csv-reader";
import {
  getISOWeek,
  lastDayOfWeek,
  lightFormat,
  startOfWeek,
  format,
  getMonth,
  lastDayOfMonth,
  startOfMonth,
  getYear,
  isSameMonth,
} from "date-fns";

export interface UsageReportDay {
  day: string; // iso date
  totalPrice: number; // for the charts total value
  entries: UsageReportEntry[];
}

export const groupEntriesPerDay = (
  csvData: UsageReportEntry[]
): UsageReportDay[] => {
  return csvData.reduce((acc: UsageReportDay[], obj) => {
    let indexOfEntryForCurrentDate = 0;
    const currentDate = new Date(obj.date).toISOString();

    //Is the current date already in acc?
    if (
      !acc.find((objectsInAcc: UsageReportDay, index) => {
        indexOfEntryForCurrentDate = index;
        return objectsInAcc.day === currentDate;
      })
    ) {
      const newEntry: UsageReportDay = {
        day: currentDate,
        totalPrice: obj.totalPrice,
        entries: [obj],
      };
      acc.push(newEntry);
    } else {
      acc[indexOfEntryForCurrentDate].entries.push(obj);
      acc[indexOfEntryForCurrentDate].totalPrice =
        acc[indexOfEntryForCurrentDate].totalPrice + obj.totalPrice;
    }
    return acc;
  }, []);
};

export interface UsageReportWeek {
  week: string; // a.e.: "12.5. - 19.5."
  from: string; // iso date
  to: string; // iso date
  weekNumber: number;
  totalPrice: number; // for the charts total value
  entries: UsageReportEntry[];
}

export const groupEntriesPerWeek = (
  csvData: UsageReportEntry[],
  isDataFromWidget: boolean
): UsageReportWeek[] => {
  return csvData.reduce((acc: UsageReportWeek[], obj) => {
    let indexOfEntryForCurrentDate = 0;
    const currentDate = new Date(obj.date);
    const currentFirstDayOfTheWeek = startOfWeek(currentDate);

    //Is the current date already in acc?
    if (
      !acc.find((objectsInAcc: UsageReportWeek, index) => {
        indexOfEntryForCurrentDate = index;
        return objectsInAcc.from === currentFirstDayOfTheWeek.toISOString();
      })
    ) {
      const firstDayOfTheWeek = startOfWeek(currentDate);
      const lastDayOfTheWeek = lastDayOfWeek(currentDate);

      let firstDayOfTheWeekRange = startOfWeek(currentDate);
      let lastDayOfTheWeekRange = lastDayOfWeek(currentDate);

      if (isDataFromWidget) {
        if (!isSameMonth(firstDayOfTheWeek, currentDate)) {
          firstDayOfTheWeekRange = startOfMonth(currentDate);
        }
        if (!isSameMonth(lastDayOfTheWeek, currentDate)) {
          lastDayOfTheWeekRange = lastDayOfMonth(currentDate);
        }
      }

      const newEntry: UsageReportWeek = {
        week: `${lightFormat(firstDayOfTheWeekRange, "dd.MM.")} - ${lightFormat(
          lastDayOfTheWeekRange,
          "dd.MM."
        )}`,
        from: firstDayOfTheWeek.toISOString(),
        to: lastDayOfTheWeek.toISOString(),
        weekNumber: getISOWeek(currentDate),
        totalPrice: obj.totalPrice,
        entries: [obj],
      };
      acc.push(newEntry);
    } else {
      acc[indexOfEntryForCurrentDate].entries.push(obj);
      acc[indexOfEntryForCurrentDate].totalPrice =
        acc[indexOfEntryForCurrentDate].totalPrice + obj.totalPrice;
    }
    return acc;
  }, []);
};

export interface UsageReportMonth {
  monthName: string; // a.e.: "April 2020"
  month: number; // a.e. 4
  from: string; // iso date
  to: string; // iso date
  totalPrice: number; // for the charts total value
  entries: UsageReportEntry[];
}

export const groupEntriesPerMonth = (
  csvData: UsageReportEntry[]
): UsageReportMonth[] => {
  return csvData.reduce((acc: UsageReportMonth[], obj) => {
    let indexOfEntryForCurrentDate = 0;
    const currentDate = new Date(obj.date);
    const currentStartOfMonth = startOfMonth(currentDate).toISOString();

    //Is the current date already in acc?
    if (
      !acc.find((objectsInAcc: UsageReportMonth, index) => {
        indexOfEntryForCurrentDate = index;
        return objectsInAcc.from === currentStartOfMonth;
      })
    ) {
      const firstDayOfMonth = startOfMonth(currentDate);
      const lastDayOfTheMonth = lastDayOfMonth(currentDate);

      const newEntry: UsageReportMonth = {
        monthName: `${format(currentDate, "LLLL")} ${getYear(currentDate)}`,
        month: getMonth(currentDate) + 1,
        from: firstDayOfMonth.toISOString(),
        to: lastDayOfTheMonth.toISOString(),
        totalPrice: obj.totalPrice,
        entries: [obj],
      };

      acc.push(newEntry);
    } else {
      acc[indexOfEntryForCurrentDate].entries.push(obj);
      acc[indexOfEntryForCurrentDate].totalPrice =
        acc[indexOfEntryForCurrentDate].totalPrice + obj.totalPrice;
    }
    return acc;
  }, []);
};

type UsageReportGeneralGrouped =
  | UsageReportDay[]
  | UsageReportWeek[]
  | UsageReportMonth[];
export const filterEntriesByRepositoryName = (
  groupedEntries: UsageReportGeneralGrouped,
  repositoryName: string
): UsageReportGeneralGrouped => {
  if (repositoryName === "") {
    return groupedEntries;
  }
  return <UsageReportGeneralGrouped>groupedEntries.map(
    (entry: { entries: UsageReportEntry[] }) => {
      return {
        ...entry,
        entries: entry.entries.filter(
          (usageReportEntry: UsageReportEntry) =>
            usageReportEntry.repositorySlug === repositoryName
        ),
      };
    }
  );
};

export interface CostPerRepository {
  repositoryName: string;
  totalCost: number;
}

export const getCostPerRepository = (
  csvData: UsageReportEntry[]
): CostPerRepository[] => {
  return csvData.reduce((acc: CostPerRepository[], currentEntry) => {
    let indexOfEntryForCurrentRepositoryName = 0;
    if (
      !acc.find((objectsInAcc: CostPerRepository, index) => {
        indexOfEntryForCurrentRepositoryName = index;
        return objectsInAcc.repositoryName === currentEntry.repositorySlug;
      })
    ) {
      const newEntry: CostPerRepository = {
        repositoryName: currentEntry.repositorySlug,
        totalCost: currentEntry.totalPrice,
      };
      acc.push(newEntry);
    } else {
      acc[indexOfEntryForCurrentRepositoryName].totalCost +=
        currentEntry.totalPrice;
    }
    return acc;
  }, []);
};

export const getPriceByRepositoryName = (
  repositoryName: string,
  currentEntries: UsageReportEntry[]
): number => {
  let priceByRepositoryName = 0;
  currentEntries.forEach((entry) => {
    if (entry.repositorySlug === repositoryName) {
      priceByRepositoryName += entry.totalPrice;
    }
  });
  return Math.round(priceByRepositoryName * 100) / 100;
};

export const getMaximumTotalPriceOfAllDays = (
  data: UsageReportEntry[]
): number => {
  const entriesGroupedPerDay = groupEntriesPerDay(data);
  return Math.ceil(
    Math.max(...entriesGroupedPerDay.map((entry) => entry.totalPrice))
  );
};

export const getMaximumTotalPriceOfAllWeeks = (
  data: UsageReportEntry[]
): number => {
  const entriesGroupedPerWeek = groupEntriesPerWeek(data, false);
  return Math.ceil(
    Math.max(...entriesGroupedPerWeek.map((entry) => entry.totalPrice))
  );
};

export const getAmountOfDays = (
  usageReportEntries: UsageReportEntry[]
): number => {
  const entriesGroupedPerDay = groupEntriesPerDay(usageReportEntries);
  return entriesGroupedPerDay.length;
};
