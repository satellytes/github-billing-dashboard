import { UsageReportEntry } from "./csv-reader";

export interface LocalStorageEntry {
  filename: string;
  entries: UsageReportEntry[];
}

const LocalStorageEntryKeyName = "GitHubBillingDashboard";

export const saveFileInLocalStorage = (
  githubBillingEntries: UsageReportEntry[],
  fileName: string
): void => {
  const entriesForLocalStorage = {
    filename: fileName,
    entries: githubBillingEntries,
  };
  const alreadyExistingEntriesFromLocalStorage =
    getBillingFilesFromLocalStorage();
  if (alreadyExistingEntriesFromLocalStorage) {
    let isFileAlreadyInLocalStorage = false;
    alreadyExistingEntriesFromLocalStorage.forEach(
      (entry: LocalStorageEntry) => {
        if (entry.filename === fileName) {
          isFileAlreadyInLocalStorage = true;
        }
      }
    );

    if (!isFileAlreadyInLocalStorage) {
      alreadyExistingEntriesFromLocalStorage.push(entriesForLocalStorage);
      localStorage.setItem(
        LocalStorageEntryKeyName,
        JSON.stringify(alreadyExistingEntriesFromLocalStorage)
      );
    }
  } else {
    localStorage.setItem(
      LocalStorageEntryKeyName,
      JSON.stringify([entriesForLocalStorage])
    );
  }
};

export const getBillingFilesFromLocalStorage = ():
  | LocalStorageEntry[]
  | null => {
  const itemsFromLocalStorage = localStorage.getItem(LocalStorageEntryKeyName);
  if (!itemsFromLocalStorage) {
    return null;
  }
  return JSON.parse(itemsFromLocalStorage);
};
