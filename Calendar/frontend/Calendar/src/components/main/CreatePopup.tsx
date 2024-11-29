// @ts-ignore
import '../../css/createPopup.css'
import React, {useEffect, useState} from "react";
import {PictureUploadLabel} from "../inner/PictureUpload.tsx";
import PictureUploadInput from "../inner/PictureUploadInput.tsx";
import AccountPic from "../inner/AccountPic.tsx";
import {User} from "../../types/User.ts";
import {read} from "node:fs";


const CreatePopup = () => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('../src/assets/defaultAccPic.png');
    const [vorname, setVorname] = useState<string>('');
    const [nachname, setNachname] = useState<string>('');
    const [ausBeginn, setAusBeginn] = useState('');
    const [ausEnde, setAusEnde] = useState('');
    const [stadt, setStadt] = useState('');
    const [abteilung, setAbteilung] = useState('');
    const [team, setTeam] = useState('');
    const [file, setFile] = useState<string>('');

    const bundesland = getBundesland();
    const azubiKey = vorname.slice(0, 3).toUpperCase() + '-' + nachname.slice(0, 3).toUpperCase() + '-' + bundesland;


    function getBundesland(): string {
        let bundesland = '';
        if (stadt === 'Koblenz') {
            bundesland = 'RP';
        } else if (stadt === 'Oberessendorf') {
            bundesland = 'BW';
        } else if (stadt === 'Siegen') {
            bundesland = 'NW';
        }
        return bundesland;
    }

    function closeCreatePopup(): void {
        const createPopup: HTMLElement | null = document.getElementById('createPopup')
        createPopup.style.display = 'none';
    }


    useEffect(() => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const year = firstDayOfMonth.getFullYear();
        const month = String(firstDayOfMonth.getMonth() + 1).padStart(2, '0'); // Months are zero-based, add 1
        const day = String(firstDayOfMonth.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        setAusBeginn(formattedDate);
        setAusEnde(formattedDate);
    }, [])

    async function createUser() {
        const formData = new FormData();
        formData.append('azubiKey', azubiKey);
        formData.append('vorname', vorname);
        formData.append('nachname', nachname);
        formData.append('ausbildungsbeginn', ausBeginn);
        formData.append('ausbildungsende', ausEnde);
        formData.append('abteilung', abteilung);
        formData.append('team', team);
        formData.append('bundesland', bundesland);
        formData.append('standort', stadt);
        formData.append('Bild', file);
        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }
        try {
            const response = await fetch('http://localhost:3010/api/users/createAzubi', {
                method: 'POST',
                body: formData
            });
        } catch (err) {
            console.error('Error:', err);
            console.log('An error occurred while creating the user.');
        }
    }


    function handleVornameChange(evt) {
        setVorname(evt.target.value);
    }

    function handleNachnameChange(evt) {
        setNachname(evt.target.value);
    }

    function handleAusBeginnChange(evt) {
        setAusBeginn(evt.target.value);
    }

    function handleAusEndeChange(evt) {
        setAusEnde(evt.target.value);
    }

    function handleStadtChange(evt) {
        setStadt(evt.target.value);
    }

    function handleAbteilungChange(evt) {
        setAbteilung(evt.target.value);
    }

    function handleTeamChange(evt) {
        setTeam(evt.target.value);
    }

    const changeUserPicture = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setFile(reader.result);
        };
        reader.readAsDataURL(file);
    }
    return (
        <div className="createPopup" id="createPopup">
            <img src="../src/assets/closeBtn.png" id="closePopup3" onClick={closeCreatePopup}
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
                <button id="createAzubiBtn" onClick={createUser}>Account anlegen</button>
            </div>
        </div>

    )
}


export default CreatePopup;