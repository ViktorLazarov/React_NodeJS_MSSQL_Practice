import React from "react";

interface FileInputProps {
    onFileChange: (file: File) => void;
}

const PictureUploadInput: React.FC<FileInputProps> = ({onFileChange}) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            onFileChange(file);
        }
    };

    return (
        <input
            id={"picture-upload-create"}
            name="picture-upload-create"
            type="file"
            accept="image/.jpg,image/jpeg,image/png"
            onChange={handleChange}
        />

    )
}

export default PictureUploadInput;