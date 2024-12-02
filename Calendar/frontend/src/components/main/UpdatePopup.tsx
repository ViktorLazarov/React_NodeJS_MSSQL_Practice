// @ts-ignore
import '../../css/updatePopup.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import {PictureUploadLabel} from "../inner/PictureUpload.tsx";
import PictureUploadInput from "../inner/PictureUploadInput.tsx";
import AccountPic from "../inner/AccountPic.tsx";
import {getBundesland} from "../../features/getBundesland.ts";
import {validateInput} from "../../features/validateUserInput.ts";
import {User} from "../../types/User.ts";
import {convertBinaryToBase64} from "./AzubiCard.tsx";

type Props = {
    user: User;
}


const UpdatePopup = ({user}: Props): React.JSX.Element => {

    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(convertBinaryToBase64(user.Bild));
    const [vorname, setVorname] = useState<string>(user.Vorname);
    const [nachname, setNachname] = useState<string>(user.Nachname);
    const [ausBeginn, setAusBeginn] = useState<string>('');
    const [ausEnde, setAusEnde] = useState<string>('');
    const [stadt, setStadt] = useState(user.Standort);
    const [abteilung, setAbteilung] = useState(user.Abteilung);
    const [team, setTeam] = useState(user.Team);
    const [userPic, setUserPic] = useState<File>();


    const bundesland: string = getBundesland(stadt);
    const azubiKey: string = vorname.slice(0, 3).toUpperCase() + '-' + nachname.slice(0, 3).toUpperCase() + '-' + bundesland;


    function closeUpdatePopup(): void {
        const updatePopup: HTMLElement | null = document.getElementById('updatePopup' + user.ID)

        updatePopup.style.display = 'none';
    }

    async function deleteAzubi(userID: string) {
        try {
            const response = await fetch(`http://localhost:3010/api/users/deleteAzubiById/${userID}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => res.json())
                .then(data => {
                })
                .finally(() => {
                    window.location.reload();
                })

        } catch (error) {
            console.log(error)
        }
    }


    async function updateAzubi() {

        if (validateInput(vorname, nachname, ausBeginn, ausEnde, stadt, abteilung, team, userPic)) {

            const formDataUpdate: FormData = new FormData();
            formDataUpdate.append('ID', user.ID.toString());
            formDataUpdate.append('azubiKey', azubiKey);
            formDataUpdate.append('vorname', vorname);
            formDataUpdate.append('nachname', nachname);
            formDataUpdate.append('ausbildungsbeginn', ausBeginn);
            formDataUpdate.append('ausbildungsende', ausEnde);
            formDataUpdate.append('abteilung', abteilung);
            formDataUpdate.append('team', team);
            formDataUpdate.append('bundesland', bundesland);
            formDataUpdate.append('standort', stadt);
            formDataUpdate.append('image', userPic);

            try {
                const response = await fetch('http://localhost:3010/api/users/updateAzubi', {
                    method: 'PUT',
                    body: formDataUpdate
                })
                    .then(res => res.json())
                    .then(data =>{
                        alert(data.message)
                    })
                    .finally(()=>{
                        window.location.reload();
                    });
            } catch (err) {
                console.error('Error:', err);
                console.log('An error occurred while updating the user.');
            }
        }

    }

    useEffect(() => {
        const start: Date = new Date(user.Ausbildungsbeginn);
        const yearStart: number = start.getFullYear();
        const monthStart: string = String(start.getMonth() + 1).padStart(2, '0'); // Months are zero-based, add 1
        const dayStart: string = String(start.getDate()).padStart(2, '0');
        const formattedStart: string = `${yearStart}-${monthStart}-${dayStart}`;

        const end: Date = new Date(user.Ausbildungsende);
        const yearEnd: number = end.getFullYear();
        const monthEnd: string = String(end.getMonth() + 1).padStart(2, '0'); // Months are zero-based, add 1
        const dayEnd: string = String(end.getDate()).padStart(2, '0');
        const formattedEnd: string = `${yearEnd}-${monthEnd}-${dayEnd}`;

        setAusBeginn(formattedStart);
        setAusEnde(formattedEnd);
    }, [user])


    function handleVornameChange(evt: ChangeEvent<HTMLInputElement>) {
        setVorname(evt.target.value);
    }

    function handleNachnameChange(evt: ChangeEvent<HTMLInputElement>) {
        setNachname(evt.target.value);
    }

    function handleAusBeginnChange(evt: ChangeEvent<HTMLInputElement>) {
        setAusBeginn(evt.target.value);
    }

    function handleAusEndeChange(evt: ChangeEvent<HTMLInputElement>) {
        setAusEnde(evt.target.value);
    }

    function handleStadtChange(evt: ChangeEvent<HTMLSelectElement>) {
        setStadt(evt.target.value);
    }

    function handleAbteilungChange(evt: ChangeEvent<HTMLSelectElement>) {
        setAbteilung(evt.target.value);
    }

    function handleTeamChange(evt: ChangeEvent<HTMLSelectElement>) {
        setTeam(evt.target.value);
    }

    const changeUserPicture = (file: File) => {
        const reader = new FileReader();
        setUserPic(file);
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="updatePopup" id={"updatePopup" + user.ID}>
            <img src={"../src/assets/closeBtn.png"} id="closePopup3" onClick={closeUpdatePopup}
                 title="Fenster schließen"></img>
            <div className="dayNumberPopUp" id="dayNumberPopUpID3">Azubi anlegen</div>
            <div className="headerAzubiPopup">
                <div className="picture-upload-container">
                    <PictureUploadInput onFileChange={changeUserPicture}/>
                    <PictureUploadLabel/>
                </div>
                <AccountPic imageSrc={imageSrc as string}/>
            </div>
            <div className="scrollMe2">
                <form id="terminformAzubi">
                    <div className="azubiInput">
                        <div className="formatTogether">
                            <input value={vorname} id="vorname" placeholder="Vorname" type="text"
                                   onChange={handleVornameChange}/>
                            <input value={nachname} id="lastname" placeholder="Nachname" type="text"
                                   onChange={handleNachnameChange}/>
                        </div>

                        <label htmlFor="beginn">Ausbildungsbeginn: </label>
                        <input value={ausBeginn} id="beginn" type="date" onChange={handleAusBeginnChange}/>

                        <label htmlFor="ende">voraussichtliches Ausbildungsende: </label>
                        <input value={ausEnde} id="ende" type="date" onChange={handleAusEndeChange}/>

                        <label htmlFor="StandortAuswahl">Stadt auswählen oder neue hinzufügen:</label>
                        <select value={stadt} id="StandortAuswahl" onChange={handleStadtChange}>
                            <option value="" id="leerStandort">Stadt auswählen</option>
                            <option value="Koblenz" className="standortName">Koblenz</option>
                            <option value="Oberessendorf" className="standortName">Oberessendorf</option>
                            <option value="Siegen" className="standortName">Siegen</option>
                        </select>

                        <button className="neueDaten" type="button">+
                        </button>

                        <label htmlFor="abteilungDropdown">Abteilung auswählen oder neue hinzufügen</label>
                        <div id="abteilungDropdown">
                            <select value={abteilung} className="abteilungen" id="abteilungen"
                                    onChange={handleAbteilungChange}>
                                <option value="" id="leerAbteilung">Abteilung auswählen</option>
                                <option value="Entwicklung" className="abteilungName">Entwicklung</option>
                                <option value="Buchhaltung" className="abteilungName">Buchhaltung</option>
                                <option value="Zentrale IT" className="abteilungName">Zentrale IT</option>
                            </select>
                        </div>

                        <button className="neueDaten" type="button">+
                        </button>

                        <label htmlFor="teamsDropdown">Team auswählen oder neues hinzufügen</label>
                        <div id="teamsDropdown">
                            <select value={team} className="teams" id="teams" onChange={handleTeamChange}>
                                <option value="" id="leerTeam">Team auswählen</option>
                                <option value="TWIN FiBu KO" className="teamName">TWIN FiBu KO</option>
                                <option value="TWIN Cobra" className="teamName">TWIN Cobra</option>
                                <option value="Zentrale IT" className="teamName">Zentrale IT</option>
                                <option value="Buchhaltung" className="teamName">Buchhaltung</option>
                                <option value="Team DMS" className="teamName">Team DMS</option>
                                <option value="Team TWIN OED" className="teamName">Team TWIN OED</option>
                                <option value="Team REWE" className="teamName">Team REWE</option>
                            </select>
                        </div>

                        <button className="neueDaten" type="button">+</button>

                    </div>
                </form>
                <button id="deleteAzubiBtn" onClick={() => deleteAzubi(user.ID.toString())}>Delete Azubi
                </button>
                <button id="updateAzubiBtn" onClick={() => updateAzubi()}>Update Azubi
                </button>
            </div>
        </div>

    )
}

export default UpdatePopup;