import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { GridItem } from "../grid/grid";

interface FileInputProp {
  onInput: (file: File) => void;
}

const Title = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 35px;
  margin-top: 120px;
`;

const Subline = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-top: 24px;
`;

const StyledFileInput = styled.div`
  margin-top: 32px;
  margin-bottom: 397px;
  padding: 30px;
  background: rgba(122, 143, 204, 0.3);
  border: 1px solid rgba(122, 143, 204, 0.3);
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-color: white;
  }
`;

export const FileInput = ({ onInput }: FileInputProp): JSX.Element => {
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onInput(acceptedFiles[0]);
      history.push("/dashboard");
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <>
      <GridItem md={7}>
        <Title>Github Report Usage UI</Title>
        <Subline>
          Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas
          sed diam eget risus varius blandit sit amet non magna.
        </Subline>
      </GridItem>
      <GridItem>
        <StyledFileInput {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drop a csv file here, or click to select a file</p>
          )}
        </StyledFileInput>
      </GridItem>
    </>
  );
};
