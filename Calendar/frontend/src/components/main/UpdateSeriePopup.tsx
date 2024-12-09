// @ts-ignore
import '../../css/createTerminPopup.css';
import React, {ChangeEvent, useEffect, useState} from "react";
import {EventInterface} from "../../types/eventInterface.ts";

type Props = {
    eventInfo: EventInterface
    updateClick: Function
}

const UpdateSeriePopup = ({eventInfo, updateClick}: Props): React.JSX.Element => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [categoryDropDown, setCategoryDropDown] = useState<string>(eventInfo.title.split(' ')[0]);
    const [azubiDropDown, setAzubiDropDown] = useState<string>('Ohne Azubi');
    const [categoryInput, setCategoryInput] = useState<string>('');


    function closeSeriePopup(): void {
        const createPopup: HTMLElement | null = document.getElementById('updateSeriePopup')
        createPopup.style.display = 'none';

        setIsChecked(false);
        const dropdown = document.getElementById('vanishDropdown1');
        if (dropdown) dropdown.style.display = 'block'
        const newCategoryInput = document.getElementById('TerminBZ');
        if (newCategoryInput) newCategoryInput.style.display = 'none';
    }


    const updateSerie = async function () {
        let bezeichnung;

        if (isChecked) {
            bezeichnung = categoryInput;
        } else {
            bezeichnung = categoryDropDown;
        }

        const updateData = {
            id: eventInfo.extendedProps.location,
            bezeichnung: bezeichnung,
            azubi: azubiDropDown,
        };

        try {
            await fetch(`http://localhost:3010/api/termins/updateSerie`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .finally(() => {
                    closeSeriePopup()
                    updateClick()
                    setCategoryInput('')
                    setAzubiDropDown('Ohne Azubi');
                    const repeatDropdown = document.getElementById('vanish');
                    repeatDropdown.style.display = 'none';
                })
        } catch (err) {
            console.error('Error:', err);
            console.log('An error occurred while creating the termin.');
        }
    }


    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            const dropdown = document.getElementById('vanishDropdown1');
            dropdown.style.display = 'none';
            const newCategoryInput = document.getElementById('TerminBZ');
            newCategoryInput.style.display = 'block';
        } else {
            const dropdown = document.getElementById('vanishDropdown1');
            dropdown.style.display = 'block';
            const newCategoryInput = document.getElementById('TerminBZ');
            newCategoryInput.style.display = 'none';
        }

    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryInput(event.target.value);
    };
    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategoryDropDown(event.target.value);
    };
    const handleAzubiDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setAzubiDropDown(event.target.value);
    };

    return (
        <div className={"popup"} id={"updateSeriePopup"}>

            <img src={"../src/assets/closeBtn.png"} id="closeCreatePopup"
                 title="Fenster schließen" onClick={closeSeriePopup}></img>

            <div className={"dayNumberPopUp"} id={"dayNumberPopUpID2"}>Update Serie</div>

            <div className={"scrollMe2"}>
                <form id={"terminform"}>
                    <p>Bestehende Kategorie auswählen oder neuen hinzufügen</p>
                    <div id={"vanishDropdown1"}>
                        <select className={"terminInput"} id={"neuenTerminauswaehlen"}
                                onChange={handleDropdownChange}>
                            <option value={"Berufsschule"} className={"azubiName"}>Berufsschule</option>
                            <option value={"Berufsschule(Serie)"} className={"azubiName"}>Berufsschule(Serie)</option>
                            <option value={"test"} className={"azubiName"}>test</option>
                        </select>
                    </div>

                    <input id={"TerminBZ"} type={"text"} onChange={handleInputChange} value={categoryInput}/>

                    <input id={"terminNameEingabeCheckbox"} name={"neuerTerminNameEingabe"} type={"checkbox"}
                           checked={isChecked} onChange={handleCheckboxChange}/>
                    <label htmlFor={"terminNameEingabeCheckbox"}>Neue Kategorie hinzufügen</label>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <p>Azubi:</p>
                    <select value={azubiDropDown} className={"terminInput"} id={"neuenTerminAzubiZuordnen"}
                            onChange={handleAzubiDropdownChange}>
                        <option value={"Ohne-Azubi"} className={"azubiName"}>Ohne Azubi</option>
                        <option value={"DFS-DFD-RP"} className={"azubiName"}>dfsdf dfdf</option>
                        <option value={"VIK-SDF-RP"} className={"azubiName"}>viktor sdfsdf</option>
                        <option value={"SFS-SDF-BW"} className={"azubiName"}>sfsdf sdfsdf</option>
                        <option value={"DFD-SDF-RP"} className={"azubiName"}>dfdf sdfsdf</option>
                        <option value={"VIK-LAZ-RP"} className={"azubiName"}>Viktor Lazarov</option>
                    </select>
                    <br/>
                    <br/>
                    <br/>
                </form>
                <button id="createAzubiBtn" onClick={updateSerie}>Update Serie</button>
            </div>
        </div>

    )
}

export default UpdateSeriePopup;
