// @ts-ignore
import '../../css/createTerminPopup.css';
import React, {ChangeEvent, useEffect, useState} from "react";
import {getBundesland} from "../../features/getBundesland.ts";
import {getStandort} from "../../features/getStandort.ts";


const CreateTerminPopup = (): React.JSX.Element => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [categoryDropDown, setCategoryDropDown] = useState<string>('Berufsschule');
    const [azubiDropDown, setAzubiDropDown] = useState<string>('Ohne-Azubi');
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [dateStart, setDateStart] = useState<string>('');
    const [timeStart, setTimeStart] = useState<string>('08:00');
    const [dateEnd, setDateEnd] = useState<string>('');
    const [timeEnd, setTimeEnd] = useState<string>('17:00');
    const [ganztag, setGanztag] = useState<boolean>(false);
    const [repeat, setRepeat] = useState<boolean>(false);
    const [abstand, setAbstand] = useState<number>(0)
    const [wiederholungen, setWiederholungen] = useState<number>(0)

    function addDays(dateString: string, days: number) {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function closeTerminPopup(): void {
        const createPopup: HTMLElement | null = document.getElementById('popupWindow2')
        createPopup.style.display = 'none';

        setIsChecked(false);
        const dropdown = document.getElementById('vanishDropdown1');
        if (dropdown) dropdown.style.display = 'block'
        const newCategoryInput = document.getElementById('TerminBZ');
        if (newCategoryInput) newCategoryInput.style.display = 'none';
    }


    const createSingleTermin = async function () {
        let bezeichnung;
        const standort = await getStandort(azubiDropDown);

        if (isChecked) {
            bezeichnung = categoryInput;
        } else {
            bezeichnung = categoryDropDown;
        }

        const data = {
            bezeichnung: bezeichnung,
            start: dateStart + ' ' + timeStart + ":00.000",
            end: dateEnd + ' ' + timeEnd + ":00.000",
            azubi: azubiDropDown,
            ganztaegig: ganztag ? 1 : 0,
            serientermin: "0",
            standort: standort,
            bundesland: getBundesland(standort)
        };


        try {
            await fetch('http://localhost:3010/api/termins/createTermin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {

                })
                .finally(() => {
                    closeTerminPopup()
                    setCategoryInput('')
                    setDateStart('');
                    setDateEnd('')
                    setTimeStart('08:00');
                    setTimeEnd('17:00');
                    setAzubiDropDown('Ohne Azubi');
                    setGanztag(false);
                    setRepeat(false);
                    const repeatDropdown = document.getElementById('vanish');
                    repeatDropdown.style.display = 'none';
                })


        } catch (err) {
            console.error('Error:', err);
            console.log('An error occurred while creating the termin.');
        }
    }

    const createSerientermin = async function(){

        let serienBezeichnung;

        if (isChecked) {
            serienBezeichnung = categoryInput;
        } else {
            serienBezeichnung = categoryDropDown;
        }
        const serienData = {
            bezeichnung: serienBezeichnung,
            start: dateStart + ' ' + timeStart + ":00.000",
            end: dateEnd + ' ' + timeEnd + ":00.000",
            azubi: azubiDropDown,
            inkrementInDays: abstand.toString(),
            serienTerminAnzahl: wiederholungen.toString()
        };
        let data;
        try {
            const result = await fetch('http://localhost:3010/api/termins/createSerien', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(serienData)
            });
            data = await result.json();
        } catch (err) {
            console.error('Error:', err);
            console.log('An error occurred while creating the serien termin.');
        }

        let bezeichnung;
        const standort = await getStandort(azubiDropDown);

        if (isChecked) {
            bezeichnung = categoryInput + '(Serie)';
        } else {
            bezeichnung = categoryDropDown + '(Serie)';
        }

        for (let i = 0; i < wiederholungen; i++) {
            const terminStart = addDays(dateStart, (abstand+1)  * i)
            const terminEnd = addDays(dateEnd, (abstand+1) * i)
            const terminData = {
                bezeichnung: bezeichnung,
                start: terminStart + ' ' + timeStart + ":00.000",
                end: terminEnd + ' ' + timeEnd + ":00.000",
                azubi: azubiDropDown,
                ganztaegig: ganztag ? 1 : 0,
                serientermin: 1,
                serienTerminID: data.ID,
                standort: standort,
                bundesland: getBundesland(standort)
            };

            try {
                await fetch('http://localhost:3010/api/termins/createTermin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(terminData)
                })
                    .then(res => res.json())
                    .then(data => {

                    })
                    .finally(() => {
                        closeTerminPopup()
                        setCategoryInput('')
                        setDateStart('');
                        setDateEnd('')
                        setTimeStart('08:00');
                        setTimeEnd('17:00');
                        setAzubiDropDown('Ohne Azubi');
                        setGanztag(false);
                        setRepeat(false);
                        const repeatDropdown = document.getElementById('vanish');
                        repeatDropdown.style.display = 'none';
                    })
            } catch (err) {
                console.error('Error:', err);
                console.log('An error occurred while creating the termin.');
            }
        }
    }

    const createTermin = async function () {
        if (!repeat) {
            await createSingleTermin();
        } else {
            await createSerientermin();
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
    const handleDateStartChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDateStart(event.target.value);
    }
    const handleTimeStartChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTimeStart(event.target.value);
    }
    const handleDateEndChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDateEnd(event.target.value);
    }
    const handleTimeEndChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTimeEnd(event.target.value);
    }
    const handleGanztagChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGanztag(event.target.checked)
    }
    const handleRepeatChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRepeat(event.target.checked)
        if (event.target.checked) {
            const repeatDropdown = document.getElementById('vanish');
            repeatDropdown.style.display = 'block';
        } else {
            const repeatDropdown = document.getElementById('vanish');
            repeatDropdown.style.display = 'none';
        }
    }
    const handleAbstandChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAbstand(parseInt(event.target.value))
    }
    const handleWiederholungenChange = (event: ChangeEvent<HTMLInputElement>) => {
        setWiederholungen(parseInt(event.target.value))
    }
    return (
        <div className={"popup"} id={"popupWindow2"}>

            <img src={"../src/assets/closeBtn.png"} id="closeCreatePopup"
                 title="Fenster schließen" onClick={closeTerminPopup}></img>

            <div className={"dayNumberPopUp"} id={"dayNumberPopUpID2"}>Neuer Termin</div>

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

                    <p>Start:</p>
                    <input className={"terminInput"} id={"termin-date-start"} name={"termin-date-start"}
                           type={"date"} onChange={handleDateStartChange} value={dateStart}/>
                    <input className={"terminInput"} id={"termin-time-start"} name={"termin-time-start"}
                           type={"time"} onChange={handleTimeStartChange} value={timeStart} disabled={ganztag}/>


                    <br/>
                    <br/>

                    <p>Ende:</p>
                    <input className={"terminInput"} id={"termin-date-end"} name={"meeting-time-end"}
                           type={"date"} onChange={handleDateEndChange} value={dateEnd}/>
                    <input className={"terminInput"} id={"termin-time-end"} name={"meeting-time-end-laz"}
                           type={"time"}
                           min={"08:00"} onChange={handleTimeEndChange} value={timeEnd} disabled={ganztag}/>

                    <br/>
                    <br/>

                    <input id={"ganztag"} name={"fullDayCheckBox"} type={"checkbox"} checked={ganztag}
                           onChange={handleGanztagChange}/>
                    <label htmlFor={"ganztag"}>ganztägig</label>

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

                    <input id={"wiederholen"} name={"wiederholenCheckbox"} type={"checkbox"} checked={repeat}
                           onChange={handleRepeatChange}/>
                    <label htmlFor={"wiederholen"}>Termin wiederholen</label>

                    <br/>
                    <br/>

                    <div id={"vanish"}>
                        <label htmlFor={"abstand"} id={"abstandLabel"}>Im Abstand von <input
                            className={"wochenInput"}
                            id={"abstand"}
                            onChange={handleAbstandChange}/>Tage</label>

                        <br/>
                        <br/>

                        <label htmlFor={"end"} id={"endLabel"}>Endet nach <input className={"wochenInput"}
                                                                                 id={"end"}
                                                                                 onChange={handleWiederholungenChange}/>Wiederholungen
                        </label>
                    </div>

                </form>
                <button id="createAzubiBtn" onClick={createTermin}>Termin erstellen</button>
            </div>
        </div>

    )
}

export default CreateTerminPopup;
