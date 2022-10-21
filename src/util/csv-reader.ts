import { parse } from "papaparse";
import { saveFileInLocalStorage } from "./local-storage";

export interface UsageReportCsvEntry {
  date: string;
  product: string;
  repositorySlug: string;
  quantity: string;
  unitType: string;
  pricePerUnit: string;
  actionsWorkflow: string;
  notes: string;
}

export interface UsageReportEntry extends UsageReportCsvEntry {
  totalPrice: number;
}

const camalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-0]+(.)/g, (m, chr) => chr.toUpperCase());
};

const hasCorrectCsvSchema = (parseResult: object) => {
  return (
    !Object.prototype.hasOwnProperty.call(parseResult, "date") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "product") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "repositorySlug") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "quantity") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "unitType") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "pricePerUnit") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "actionsWorkflow") ||
    !Object.prototype.hasOwnProperty.call(parseResult, "notes")
  );
};

export const getCsvFile = (file: File): Promise<UsageReportEntry[]> => {
  return new Promise((resolve, reject) => {
    parse<UsageReportCsvEntry>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string): string => {
        if (header.endsWith(" ($)")) {
          const headerWithoutUnit = header.replace(" ($)", "");
          return camalize(headerWithoutUnit);
        }
        if (header.endsWith(" (€)")) {
          const headerWithoutUnit = header.replace(" (€)", "");
          return camalize(headerWithoutUnit);
        }
        return camalize(header);
      },
      complete: (result) => {
        if (
          result.errors.length !== 0 ||
          result.data.find(hasCorrectCsvSchema)
        ) {
          reject();
          return;
        }
        const githubBillingEntries: UsageReportEntry[] = result.data.map(
          (dailyEntry) => {
            // remove dollar sign
            const price = dailyEntry.pricePerUnit.substring(1);
            return {
              ...dailyEntry,
              totalPrice: parseFloat(dailyEntry.quantity) * parseFloat(price),
            };
          }
        );

        saveFileInLocalStorage(githubBillingEntries, file.name);
        resolve(githubBillingEntries);
      },
    });
  });
};
