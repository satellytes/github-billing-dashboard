import { UsageReportEntry } from "./csv-reader";

export interface LocalStorageEntry {
  filename: string;
  entries: UsageReportEntry[];
}

const localStorageEntryKeyName = "GitHubBillingDashboard";

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
        localStorageEntryKeyName,
        JSON.stringify(alreadyExistingEntriesFromLocalStorage)
      );
    }
  } else {
    localStorage.setItem(
      localStorageEntryKeyName,
      JSON.stringify([entriesForLocalStorage])
    );
  }
};

export const getBillingFilesFromLocalStorage = ():
  | LocalStorageEntry[]
  | null => {
  const itemsFromLocalStorage = localStorage.getItem(localStorageEntryKeyName);
  if (!itemsFromLocalStorage) {
    return null;
  }
  return JSON.parse(itemsFromLocalStorage);
};

export const removeFileFromLocalStorage = (index: number): void => {
  const currentFilesInLocalStorage = getBillingFilesFromLocalStorage();
  if (currentFilesInLocalStorage) {
    currentFilesInLocalStorage.splice(index, 1);
    localStorage.setItem(
      localStorageEntryKeyName,
      JSON.stringify(currentFilesInLocalStorage)
    );
  }
};
