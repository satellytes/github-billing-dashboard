import React, {useRef} from "react";

// @ts-ignore
const FileInput = ({callback}) => {

    const fileInput = useRef(null);
    const handleSubmit= (event: React.FormEvent) => {
        event.preventDefault()
        // @ts-ignore
        callback(fileInput.current.files[0])
        ;
    }

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
    )
}

export default FileInput