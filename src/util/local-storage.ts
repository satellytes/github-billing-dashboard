import { UsageReportEntry } from "./csv-reader";

export interface LocalStorageEntry {
  filename: string;
  entries: UsageReportEntry[];
}

const LOCAL_STORAGE_ENTRY_KEY_NAME = "GitHubBillingDashboard_";

export const saveFileInLocalStorage = (
  githubBillingEntries: UsageReportEntry[],
  filename: string
): void => {
  localStorage.setItem(
    LOCAL_STORAGE_ENTRY_KEY_NAME + filename,
    JSON.stringify({ filename, entries: githubBillingEntries })
  );
};

export const getBillingFilesFromLocalStorage = ():
  | LocalStorageEntry[]
  | null => {
  const allLocalStorageEntries = Object.entries(localStorage);
  console.log(allLocalStorageEntries);
  return allLocalStorageEntries.map((entry) => {
    if (entry[0].startsWith(LOCAL_STORAGE_ENTRY_KEY_NAME)) {
      return JSON.parse(entry[1]);
    }
  });
};

export const removeFileFromLocalStorage = (filename: string): void => {
  localStorage.removeItem(LOCAL_STORAGE_ENTRY_KEY_NAME + filename);
};
