import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GridItem } from "../grid/grid";
import {
  getBillingFilesFromLocalStorage,
  removeFileFromLocalStorage,
} from "../../util/local-storage";
import { UsageReportEntry } from "../../util/csv-reader";
import { sampleData } from "./sampleData";
import { LocalStorageEntry } from "../../util/local-storage";
import { Subline } from "../style/typography";

interface FileInputProp {
  onInput: (file: File, isDataFromDropzone: boolean) => void;
  handleInputFromLocalStorage: (csvData: UsageReportEntry[]) => void;
  activeFileName: string;
}

const Text = styled.p`
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

  background: rgba(122, 143, 204, 0.3);
  border: 1px solid rgba(122, 143, 204, 0.3);
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-color: white;
  }

  ${(props: { isActive: boolean }) =>
    props.isActive ? "border-color: white" : ""};
`;

const ButtonContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;

const ButtonText = styled.div`
  padding: 30px;
`;

//TODO Improve position of X
const CloseFile = styled.div`
  position: absolute;
  &:hover {
    font-weight: bold;
  }
`;

export const FileInput = ({
  onInput,
  handleInputFromLocalStorage,
  activeFileName,
}: FileInputProp): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [filesFromLocalStorage, setFilesFromLocalStorage] = useState(
    getBillingFilesFromLocalStorage()
  );
  const [activeButton, setActiveButton] = useState<string>();
  let hoverOverX = false;

  const handleInput = (event: React.FormEvent) => {
    event.preventDefault();
    if (fileInput && fileInput.current && fileInput.current.files) {
      setActiveButton(undefined);
      onInput(fileInput.current.files[0], false);
    }
  };

  const useRecentFiles = (entry: UsageReportEntry[], buttonName: string) => {
    setActiveButton(buttonName);
    handleInputFromLocalStorage(entry);
  };

  useEffect(() => {
    if (activeFileName) {
      setActiveButton(activeFileName);
    }
    setFilesFromLocalStorage(getBillingFilesFromLocalStorage);
  }, [activeFileName]);

  return (
    <>
      <GridItem md={7}>
        <Subline>Visualize your CSV file</Subline>
        <Text>
          You can add your own CSV file here or just drag it into the browsers
          window. There is also a sample CSV file that you can use if you just
          want to try out the dashboard.
        </Text>
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
          <StyledButton
            isActive={"sampleBtn" === activeButton}
            onClick={() => useRecentFiles(sampleData, "sampleBtn")}
          >
            <ButtonText>Use Sample CSV File</ButtonText>
          </StyledButton>
          {filesFromLocalStorage
            ? filesFromLocalStorage.map((entry: LocalStorageEntry) => {
                return (
                  <StyledButton
                    key={entry.filename}
                    onClick={() => {
                      if (!hoverOverX) {
                        useRecentFiles(entry.entries, entry.filename);
                      }
                    }}
                    isActive={entry.filename === activeButton}
                  >
                    <CloseFile
                      onClick={() => {
                        removeFileFromLocalStorage(entry.filename);
                        setFilesFromLocalStorage(
                          getBillingFilesFromLocalStorage()
                        );
                      }}
                      onMouseEnter={() => {
                        hoverOverX = true;
                      }}
                      onMouseLeave={() => {
                        hoverOverX = false;
                      }}
                    >
                      x
                    </CloseFile>
                    <ButtonText>{entry.filename}</ButtonText>
                  </StyledButton>
                );
              })
            : null}
        </ButtonContainer>
      </GridItem>
    </>
  );
};
