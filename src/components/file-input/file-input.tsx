import React, { useCallback } from "react";
import { Description, StyledFileInput, Title } from "./style";
import { useDropzone } from "react-dropzone";

interface FileInputProp {
  onInput: (file: File) => void;
}

export const FileInput = ({ onInput }: FileInputProp): JSX.Element => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onInput(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <>
      <Title>Github Report Usage UI</Title>
      <Description>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas
        sed diam eget risus varius blandit sit amet non magna.
      </Description>
      <StyledFileInput {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drop a csv file here, or click to select a file</p>
        )}
      </StyledFileInput>
    </>
  );
};
