import React, { useRef } from "react";

interface FileInputProp {
  onSubmit: (file: File) => void;
}

export const FileInput = ({ onSubmit }: FileInputProp): JSX.Element => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (fileInput && fileInput.current && fileInput.current.files) {
      onSubmit(fileInput.current.files[0]);
    }
  };

  return (
    <div className="file-uploader">
      <form onSubmit={handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
