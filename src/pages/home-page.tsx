import React from "react";
import { StartDescription } from "../components/start-description/start-description";
import { FileInput } from "../components/file-input/file-input";
import { UsageReportEntry } from "../util/csv-reader";

interface StartProp {
  handleInput: (file: File) => void;
  handleInputFromLocalStorage: (csvData: UsageReportEntry[]) => void;
}

export const HomePage = ({
  handleInput,
  handleInputFromLocalStorage,
}: StartProp): JSX.Element => {
  return (
    <>
      <StartDescription />
      <FileInput
        onInput={handleInput}
        handleInputFromLocalStorage={handleInputFromLocalStorage}
      />
    </>
  );
};
