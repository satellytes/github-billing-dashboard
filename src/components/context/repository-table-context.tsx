import { createContext } from "react";

interface RepositoryTableType {
  activeRepositories: string[];
  setActiveRepositories: (activeRepositories: string[]) => void;
}

export const RepositoryTableContext = createContext<RepositoryTableType>({
  activeRepositories: [],
  setActiveRepositories: () => undefined,
});
