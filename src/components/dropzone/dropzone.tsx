import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const StyledDropzone = styled.div<{ isDragActive: boolean }>`
  margin: 0;
  padding: 0;
  opacity: ${(props) => (props.isDragActive ? "0.5" : "1")};
`;

const DropzoneText = styled.h1<{ isDragActive: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.isDragActive ? "flow" : "none")};
`;

interface DropzoneProp {
  onInput: (file: File, activeFileName: string) => void;
  children: React.ReactNode;
}

export const Dropzone = ({ onInput, children }: DropzoneProp): JSX.Element => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onInput(acceptedFiles[0], acceptedFiles[0].name);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <>
      <DropzoneText isDragActive={isDragActive}>
        Drop your CSV File here
      </DropzoneText>
      <StyledDropzone
        isDragActive={isDragActive}
        {...getRootProps({ onClick: (event) => event.stopPropagation() })}
      >
        <input {...getInputProps()} />
        {children}
      </StyledDropzone>
    </>
  );
};
