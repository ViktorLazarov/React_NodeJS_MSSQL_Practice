// @ts-ignore
import '../../css/clickPopup.css'
import React from "react";
import {EventInterface} from "../../types/eventInterface.ts";
import DeletePopup from "./DeletePopup.tsx";
import UpdateTerminPopup from "./UpdateTerminPopup.tsx";
import UpdateSeriePopup from "./UpdateSeriePopup.tsx";

type Props = {
    eventInfo: EventInterface
    onClose: Function
    updateClick: Function
}


const ClickPopup = ({eventInfo, onClose, updateClick}: Props): React.JSX.Element => {

    const startHours = new Date(eventInfo.start).getHours();
    const startMinutes = new Date(eventInfo.start).getMinutes();
    const endHours = new Date(eventInfo.end).getHours();
    const endMinutes = new Date(eventInfo.end).getMinutes();
    const formattedStart = `${String(startHours).padStart(2, '0')}:${String(startMinutes).padStart(2, '0')}`;
    const formattedEnd = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;

    async function deleteSingleTermin() {
        if (window.confirm(`Are you sure you want to delete the event?`)) {
            try {
                const response = await fetch(`http://localhost:3010/api/termins/deleteTermin/${eventInfo.id}-${eventInfo.extendedProps.location}`, {
                    method: 'DELETE'
                }).then(() => {
                    onClose()
                })

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the event.');
            }
        }
    }

    async function deleteSerientermin() {
        if (window.confirm(`Are you sure you want to delete the Serientermin?`)) {
            try {
                const response = await fetch(`http://localhost:3010/api/termins/deleteSerientermin/${eventInfo.extendedProps.location}`, {
                    method: 'DELETE'
                }).then(() => {
                    onClose()
                })

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the event.');
            }
        }
    }

    const handleDelete = async function () {
        if (!eventInfo.extendedProps.location) {
            await deleteSingleTermin()
        } else {
            const deletePopup = document.getElementById('terminDeleteAbfrage');
            deletePopup.style.display = 'block';
        }
    };

    const terminUpdate = async function () {
        const clickPopup: HTMLElement | null = document.getElementById('terminBearbeitenAbfrage');
        clickPopup.style.zIndex = '10';
        const updateTerminPopup: HTMLElement | null = document.getElementById('updateTerminPopup');
        updateTerminPopup.style.display = 'block';
    }
    const serieUpdate = async function () {
        const clickPopup: HTMLElement | null = document.getElementById('terminBearbeitenAbfrage');
        clickPopup.style.zIndex = '10';
        const updateTerminPopup: HTMLElement | null = document.getElementById('updateSeriePopup');
        updateTerminPopup.style.display = 'block';
    }

    let displaySerienBtn;
    let borderRadius;
    let widthBtn;
    if (eventInfo.extendedProps.location) {
        displaySerienBtn = 'block'
        borderRadius = '0'
        widthBtn = 'auto'
    } else {
        displaySerienBtn = 'none'
        borderRadius = '5px'
        widthBtn = '100%'
    }

    return (
        <>
            <div className={"popupSmall"} id={"terminBearbeitenAbfrage"}>
                <img src={"../src/assets/closeBtn.png"} id="closePopup3" onClick={() => onClose()}
                     title="Fenster schließen"></img>
                <div className={"dayNumberPopUpSmall"} id={"terminBearbeitenAbfrageText"}>Was möchtest du tun?</div>
                <div className="event-time">{formattedStart + '-' + formattedEnd}</div>
                <div className="event-title">{eventInfo.title}</div>
                <div className={"btnLine"}>
                    <div className={"delete-btn"} onClick={handleDelete} style={{width: `${widthBtn}`}}>Löschen
                    </div>
                    <div className={"bearbeiten-btn"} style={{
                        borderBottomRightRadius: `${borderRadius}`,
                        borderTopRightRadius: `${borderRadius}`,
                        width: `${widthBtn}`,
                    }}
                         onClick={terminUpdate}>Bearbeiten
                    </div>
                    <div className={"serie-bearbeiten-btn"}
                         style={{display: `${displaySerienBtn}`, width: `${widthBtn}`}} onClick={serieUpdate}>Serie bearbeiten
                    </div>
                </div>
            </div>
            <DeletePopup eventInfo={eventInfo}
                         formattedEnd={formattedEnd}
                         formattedStart={formattedStart}
                         deleteTermin={deleteSingleTermin}
                         deleteSerientermin={deleteSerientermin}/>
            <UpdateTerminPopup eventInfo={eventInfo}
                               updateClick={updateClick}/>
            <UpdateSeriePopup eventInfo={eventInfo}
                              updateClick={updateClick}/>

        </>
    )
}

export default ClickPopup;