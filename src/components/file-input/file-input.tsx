import React, { useRef } from "react";
import { Description, StyledFileInput, Title } from "./style";

interface FileInputProp {
  onInput: (file: File) => void;
}

export const FileInput = ({ onInput }: FileInputProp): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleInput = (event: React.FormEvent) => {
    event.preventDefault();

    if (fileInput && fileInput.current && fileInput.current.files) {
      onInput(fileInput.current.files[0]);
    }
  };

  return (
    <>
      <Title>Github Report Usage UI</Title>
      <Description>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas
        sed diam eget risus varius blandit sit amet non magna.
      </Description>
      <StyledFileInput className="file-uploader">
        <form onSubmit={handleInput}>
          <label>
            Upload file:
            <input type="file" ref={fileInput} onInput={handleInput} />
          </label>
        </form>
      </StyledFileInput>
    </>
  );
};
