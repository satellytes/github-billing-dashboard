import React, { useRef } from "react";
import styled from "styled-components";
import { GridItem } from "../grid/grid";
import { getBillingFilesFromLocalStorage } from "../../util/local-storage";
import { UsageReportEntry } from "../../util/csv-reader";
import { sampleData } from "./sampleData";
import { LocalStorageEntry } from "../../util/local-storage";

interface FileInputProp {
  onInput: (file: File) => void;
  handleInputFromLocalStorage: (csvData: UsageReportEntry[]) => void;
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

const StyledFileInput = styled.input`
  display: none;
  width: 100%;
  height: 100%;
`;

const InputLabel = styled.label`
  display: inline-block;

  margin-right: 4px;
  margin-bottom: 4px;
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
const StyledButton = styled.div`
  display: inline-block;

  margin-right: 4px;
  margin-bottom: 4px;
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

const ButtonContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const FileInput = ({
  onInput,
  handleInputFromLocalStorage,
}: FileInputProp): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null);
  const recentFilesFromLocalStorage = getBillingFilesFromLocalStorage();

  const handleInput = (event: React.FormEvent) => {
    event.preventDefault();

    if (fileInput && fileInput.current && fileInput.current.files) {
      onInput(fileInput.current.files[0]);
    }
  };

  const useRecentFiles = (entry: UsageReportEntry[]) => {
    handleInputFromLocalStorage(entry);
  };

  return (
    <>
      <GridItem md={7}>
        <Title>Github Billing Dashboard UI</Title>
        <Subline>
          You can add your own CSV file here or just drag it into the browsers
          window. There is also a sample CSV file that you can use if you just
          want to try out the dashboard.
        </Subline>
      </GridItem>
      <GridItem>
        <ButtonContainer>
          <InputLabel>
            Add CSV File
            <StyledFileInput
              type="file"
              accept=".csv"
              ref={fileInput}
              onInput={handleInput}
            />
          </InputLabel>
          <StyledButton onClick={() => useRecentFiles(sampleData)}>
            Use Sample CSV File
          </StyledButton>
          {recentFilesFromLocalStorage
            ? recentFilesFromLocalStorage.map(
                (entry: LocalStorageEntry, index: number) => {
                  return (
                    <StyledButton
                      key={index}
                      onClick={() => useRecentFiles(entry.entries)}
                    >
                      {entry.filename}
                    </StyledButton>
                  );
                }
              )
            : null}
        </ButtonContainer>
      </GridItem>
    </>
  );
};
