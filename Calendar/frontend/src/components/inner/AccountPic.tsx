import React, {useState} from "react";

interface ImageDisplayProps {
    imageSrc: string;
}


 const AccountPic:React.FC<ImageDisplayProps> = ({imageSrc}) => {
    return (
        <>
            <div id="AccountPict">
                <img id="azubi-pic" alt="Laden fehlgeschlagen" src={imageSrc}/>
            </div>
        </>
    )
}

export default AccountPic;