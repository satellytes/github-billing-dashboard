import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface DropzoneProp {
  onInput: (file: File) => void;
  children: React.ReactNode;
}

const StyledDropzone = styled.div`
  margin: 0;
  padding: 0;
  //margin-top: 32px;
  //margin-bottom: 397px;
  //padding: 30px;
  //background: rgba(122, 143, 204, 0);
  //border: 1px solid rgba(122, 143, 204, 0.3);
  //border-radius: 4px;
  //text-align: center;
  //cursor: pointer;
  //
  //&:hover {
  //  border-color: white;
  //}
`;

export const Dropzone = ({ onInput, children }: DropzoneProp): JSX.Element => {
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onInput(acceptedFiles[0]);
      history.push("/dashboard");
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <>
      <StyledDropzone {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </StyledDropzone>
    </>
  );
};
