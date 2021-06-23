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
import { Subline, Paragraph } from "../style/typography";

interface FileInputProp {
  onInput: (file: File, isDataFromDropzone: boolean) => void;
  handleInputFromLocalStorage: (csvData: UsageReportEntry[]) => void;
  activeFileName: string;
}

const StyledFileInput = styled.input`
  display: none;
`;

const InputLabel = styled.label`
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 8px;
  background: rgba(122, 143, 204, 0.3);
  border: 1px solid rgba(122, 143, 204, 0.3);
  border-radius: 4px;
  text-align: center;
  cursor: pointer;

  &:hover {
    border-color: white;
  }
`;

const StyledButton = styled.button<{
  isActive: boolean;
  isHoverOverX: boolean;
}>`
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 8px;
  background: rgba(122, 143, 204, 0.3);
  border: 1px solid rgba(122, 143, 204, 0.3);
  border-radius: 4px;

  cursor: pointer;

  &:hover {
    ${(props: { isHoverOverX: boolean }) =>
      !props.isHoverOverX ? "border-color: white" : ""};
  }

  ${(props: { isActive: boolean }) =>
    props.isActive ? "border-color: white" : ""};
`;

const InnerButtonContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonText = styled.div``;

const CloseFile = styled.div`
  margin-left: 32px;
  &:hover {
    font-weight: 900;
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
  const [hoverOverX, setHoverOverX] = useState<boolean>(false);

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
        <Paragraph>
          You can add your own CSV file here or just drag it into the browsers
          window. There is also a sample CSV file that you can use if you just
          want to try out the dashboard.
        </Paragraph>
      </GridItem>
      <GridItem>
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
          isHoverOverX={false}
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
                  isHoverOverX={hoverOverX}
                >
                  <InnerButtonContent>
                    <ButtonText>{entry.filename}</ButtonText>
                    <CloseFile
                      onClick={() => {
                        removeFileFromLocalStorage(entry.filename);
                        setFilesFromLocalStorage(
                          getBillingFilesFromLocalStorage()
                        );
                      }}
                      onMouseEnter={() => {
                        setHoverOverX(true);
                      }}
                      onMouseLeave={() => {
                        setHoverOverX(false);
                      }}
                    >
                      ✕
                    </CloseFile>
                  </InnerButtonContent>
                </StyledButton>
              );
            })
          : null}
      </GridItem>
    </>
  );
};
