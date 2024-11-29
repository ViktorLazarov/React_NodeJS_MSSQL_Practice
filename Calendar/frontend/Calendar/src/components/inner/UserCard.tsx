import React from "react";
// @ts-ignore
import '../../css/userCard.css'
import {User} from "../../types/User.ts";

type userCardProps = {
    user: User;
}

export type Buffer = {
    type: string,
    data: number[]
}

function convertBinaryToBase64(buffer: Buffer): string {
    if (!buffer || buffer.data.length === 0) return '../src/assets/defaultAccPic.png';
    const byteArray: Uint8Array = new Uint8Array(buffer.data);
    let binaryString: string = '';
    for (let i: number = 0; i < byteArray.byteLength; i++) {
        binaryString += String.fromCharCode(byteArray[i]);
    }
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
}

export function UserCard ({user}: userCardProps) {
const dateBeginn = new Date(user.Ausbildungsbeginn)
const dateEnde = new Date(user.Ausbildungsende)

    return (
        <>
            <div className="grid-item-azubi">
                <div className="grid-item-right">
                    <div className="deleteMe2"><img src="../src/assets/azubiBearbeiten.png" className="edit-icon"/></div>
                    <div className="grid-item-name">{user.Vorname + ' ' + user.Nachname}</div>
                    <div className="grid-item-team">{user.Team}</div>
                    <div className="grid-item-dates">{dateBeginn.toISOString().split('T')[0]}</div>
                    <div className="grid-item-dates"> bis</div>
                    <div className="grid-item-dates">{dateEnde.toISOString().split('T')[0]}</div>
                </div>
                <img className="grid-item-profile-pic" src={`${convertBinaryToBase64(user.Bild)}`} alt="user picture"/>
                <div className="grid-item-abteilung-blank">
                    <div className="grid-item-abteilung">{user.Abteilung}</div>
                </div>
            </div>
        </>
    )
}