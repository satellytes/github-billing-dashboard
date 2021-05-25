import React, { useRef } from "react";

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
    <div className="file-uploader">
      <form onSubmit={handleInput}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} onInput={handleInput} />
        </label>
      </form>
    </div>
  );
};
