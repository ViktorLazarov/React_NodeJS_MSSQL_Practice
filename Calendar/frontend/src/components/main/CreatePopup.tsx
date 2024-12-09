// @ts-ignore
import '../../css/createPopup.css'
import React, {ChangeEvent, useEffect, useState} from "react";
import {PictureUploadLabel} from "../inner/PictureUpload.tsx";
import PictureUploadInput from "../inner/PictureUploadInput.tsx";
import AccountPic from "../inner/AccountPic.tsx";
import {getBundesland} from "../../features/getBundesland.ts";


const CreatePopup = (): React.JSX.Element => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>('../src/assets/defaultAccPic.png');
    const [vorname, setVorname] = useState<string>('');
    const [nachname, setNachname] = useState<string>('');
    const [ausBeginn, setAusBeginn] = useState('');
    const [ausEnde, setAusEnde] = useState('');
    const [stadt, setStadt] = useState('');
    const [abteilung, setAbteilung] = useState('');
    const [team, setTeam] = useState('');
    const [userPic, setUserPic] = useState<File>();

    const bundesland: string = getBundesland(stadt);
    const azubiKey: string = vorname.slice(0, 3).toUpperCase() + '-' + nachname.slice(0, 3).toUpperCase() + '-' + bundesland;


    function validateInput(): boolean {
        if (!vorname) {
            alert('Please enter a valid Vorname');
            return false;
        }
        if (!nachname) {
            alert('Please enter a valid Nachname');
            return false;
        }
        if (ausBeginn >= ausEnde) {
            alert('Ausbildungsbeginn can not be equal or after Ausbildungsende');
            return false;
        }
        if (!stadt) {
            alert('Please choose a Stadt');
            return false;
        }
        if (!abteilung) {
            alert('Please choose Abteilung');
            return false;
        }
        if (!team) {
            alert('Please choose a Team');
            return false;
        }
        if (!userPic) {
            alert('Please upload a user Picture');
            return false;
        }
        return true;
    }

    function closeCreatePopup(): void {
        const createPopup: HTMLElement | null = document.getElementById('createPopup')
        createPopup.style.display = 'none';
    }


    useEffect(() => {
        const today: Date = new Date();
        const firstDayOfMonth: Date = new Date(today.getFullYear(), today.getMonth(), 1);
        const year: number = firstDayOfMonth.getFullYear();
        const month: string = String(firstDayOfMonth.getMonth() + 1).padStart(2, '0'); // Months are zero-based, add 1
        const day: string = String(firstDayOfMonth.getDate()).padStart(2, '0');
        const formattedDate: string = `${year}-${month}-${day}`;

        setAusBeginn(formattedDate);
        setAusEnde(formattedDate);
    }, [])

    async function createUser() {

        if (validateInput()) {
            console.log('no error')

            const formData: FormData = new FormData();
            formData.append('azubiKey', azubiKey);
            formData.append('vorname', vorname);
            formData.append('nachname', nachname);
            formData.append('ausbildungsbeginn', ausBeginn);
            formData.append('ausbildungsende', ausEnde);
            formData.append('abteilung', abteilung);
            formData.append('team', team);
            formData.append('bundesland', bundesland);
            formData.append('standort', stadt);
            formData.append('image', userPic);
            // for (let pair of formData.entries()) {
            //     console.log(`${pair[0]}: ${pair[1]}`);
            // }


            try {
                const response: Response = await fetch('http://localhost:3010/api/azubis/createAzubi', {
                    method: 'POST',
                    body: formData
                });
                window.location.reload();
            } catch (err) {
                console.error('Error:', err);
                console.log('An error occurred while creating the user.');
            }
        } else {
            console.log('error')
        }

    }


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
        <div className="createPopup" id="createPopup">
            <img src={"../src/assets/closeBtn.png"} id="closeCreatePopup" onClick={closeCreatePopup}
                 title="Fenster schließen"></img>
            <div className="dayNumberPopUp">Azubi anlegen</div>
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