import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface FileInputProp {
  onInput: (file: File) => void;
}

const Title = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 110%;
  margin: 120px 0 0 0;
  grid-column: 1/13;
`;

const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  grid-column: 1/9;
  margin: 24px 0 0 0;
`;

const StyledFileInput = styled.div`
  margin: 32px 0 397px 0;
  background: rgba(122, 143, 204, 0.3);
  border: 1px solid rgba(122, 143, 204, 0.3);
  border-radius: 4px;
  padding: 30px 0;
  text-align: center;
  cursor: pointer;
  grid-column: 1/13;
  &:hover {
    border-color: white;
  }
`;

export const FileInput = ({ onInput }: FileInputProp): JSX.Element => {
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onInput(acceptedFiles[0]);
      history.push("/acitve");
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
