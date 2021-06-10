import React from "react";
import { StartDescription } from "../components/start-description/start-description";
import { FileInput } from "../components/file-input/file-input";

interface StartProp {
  handleInput: (file: File) => void;
}

export const HomePage = ({ handleInput }: StartProp): JSX.Element => {
  return (
    <>
      <StartDescription />
      <FileInput onInput={handleInput} />
    </>
  );
};
