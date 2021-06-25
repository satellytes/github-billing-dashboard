import { createContext } from "react";

//TODO REMOVE ANY
interface RepositoryTableType {
  activeRepositories: any[];
  setActiveRepositories: (activeRepositories: any[]) => void;
}

export const RepositoryTableContext = createContext<RepositoryTableType>({
  activeRepositories: [],
  setActiveRepositories: () => undefined,
});
