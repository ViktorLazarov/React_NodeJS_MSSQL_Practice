import React from "react";

export function PictureUploadLabel(){
    return (
        <>
            <label htmlFor="picture-upload-create">
                <img
                    id="newUserPhoto"
                    src={"../src/assets/icons8-upload-photo-68.png"} width="30px" height="30px"
                    alt={"new user photo"}/></label>
        </>
    )
}