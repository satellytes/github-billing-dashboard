import { UsageReportEntry } from "./csv-reader";
import * as localforage from "localforage"

export interface LocalStorageEntry {
  filename: string;
  entries: UsageReportEntry[];
}

const LOCAL_STORAGE_ENTRY_KEY_NAME = "GitHubBillingDashboard_";

export const saveFileInLocalStorage =  (
  githubBillingEntries: UsageReportEntry[],
  filename: string
): void => {
  localforage.setItem(
    LOCAL_STORAGE_ENTRY_KEY_NAME + filename,
    JSON.stringify({ filename, entries: githubBillingEntries })
  ).then((_data) => {
    console.log("saved")
  }).catch((err) => {
    console.error(err)
  })
};

export const getBillingFilesFromLocalStorage = (): LocalStorageEntry[] => {
  const result: Array<LocalStorageEntry> = [];
  localforage.keys((allLocalStorageEntries: string[] | null) => {
    if (!allLocalStorageEntries) return
    allLocalStorageEntries
      .filter((entry: string | null) => {
        return entry?.startsWith(LOCAL_STORAGE_ENTRY_KEY_NAME)
      })
      .forEach((entry: string) => {
        return localforage.getItem(entry, (item) => {
          result.push(JSON.parse(item))
        })
      });
  });
  return result;
};

export const removeFileFromLocalStorage = async (filename: string): Promise<void> => {
  await localforage.removeItem(LOCAL_STORAGE_ENTRY_KEY_NAME + filename);
};
