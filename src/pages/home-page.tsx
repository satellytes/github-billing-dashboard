import React from "react";
import { StartDescription } from "../components/start-description/start-description";
import { FileInput } from "../components/file-input/file-input";
import { UsageReportEntry } from "../util/csv-reader";
import { MainHeadline } from "../components/headlines/main-headline";

interface StartProp {
  handleInput: (file: File, isDataFromDropzone: boolean) => void;
  handleInputFromLocalStorage: (csvData: UsageReportEntry[]) => void;
  activeFileName: string;
}

export const HomePage = ({
  handleInput,
  handleInputFromLocalStorage,
  activeFileName,
}: StartProp): JSX.Element => {
  return (
    <>
      <MainHeadline />
      <StartDescription />
      <FileInput
        onInput={handleInput}
        handleInputFromLocalStorage={handleInputFromLocalStorage}
        activeFileName={activeFileName}
      />
    </>
  );
};
