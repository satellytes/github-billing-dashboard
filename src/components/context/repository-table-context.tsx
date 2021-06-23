import { createContext } from "react";

interface RepositoryTableType {
  activeRepositories: any[];
}

export const RepositoryTableContext = createContext<RepositoryTableType>({
  activeRepositories: [],
});
