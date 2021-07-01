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
import { Subheading, Paragraph } from "../style/typography";

interface FileInputProp {
  onInput: (file: File, isDataFromDropzone: boolean) => void;
  handleInputFromLocalStorage: (csvData: UsageReportEntry[]) => void;
  activeFileName: string;
}

const StyledFileInput = styled.input`
  display: none;
`;

const StyledSubheading = styled.h3`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 110%;
  margin-top: 80px;
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 11px 16px;
  background: linear-gradient(275.41deg, #543fd7 0%, #2756fd 100%);
  border-radius: 40px;
  text-align: center;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    background: #668cff;
  }
`;

const StyledButton = styled.button<{
  isActive: boolean;
  isHoverOverX: boolean;
}>`
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 16px;
  padding: 11px 16px;
  background: rgba(122, 143, 204, 0.15);
  border: none;
  border-radius: 40px;
  fill-opacity: 0.5;
  cursor: pointer;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    ${(props: { isHoverOverX: boolean }) =>
      !props.isHoverOverX ? "background: rgba(122, 143, 204, 0.3)" : ""};
  }

  ${(props: { isActive: boolean }) =>
    props.isActive ? "background: rgba(122, 143, 204, 0.3)" : ""};
`;

const InnerButtonContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonText = styled.div``;

const CloseFile = styled.div`
  margin-left: 24px;
  &:hover {
    //TODO: Verena fragen was hier passieren soll
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
  console.log(filesFromLocalStorage);
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
        <Subheading>Visualize your CSV file</Subheading>
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
      </GridItem>
      {filesFromLocalStorage.length !== 0 && (
        <GridItem md={7}>
          <StyledSubheading>Uploaded Files</StyledSubheading>
          <StyledParagraph>
            Here is an overview of your uploaded files.
          </StyledParagraph>
        </GridItem>
      )}

      <GridItem>
        {filesFromLocalStorage.length !== 0
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
                        setHoverOverX(false);
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
