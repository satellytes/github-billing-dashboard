import { createContext } from "react";

export interface RepositoryColorType {
  repositoryName: string;
  color: string;
}

export const RepositoryColorContext = createContext<RepositoryColorType[]>([]);
