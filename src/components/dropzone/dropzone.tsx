import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

interface DropzoneProp {
  onInput: (file: File) => void;
  children: React.ReactNode;
}

const StyledDropzone = styled.div`
  margin: 0;
  padding: 0;
`;

export const Dropzone = ({ onInput, children }: DropzoneProp): JSX.Element => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onInput(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <>
      <StyledDropzone
        {...getRootProps({ onClick: (event) => event.stopPropagation() })}
      >
        <input {...getInputProps()} />
        {children}
      </StyledDropzone>
    </>
  );
};
