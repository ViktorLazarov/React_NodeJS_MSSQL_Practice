import React from "react";
import {EventInterface} from "../../types/eventInterface.ts";
// @ts-ignore
import '../../css/deletePopup.css'


type Props = {
    eventInfo: EventInterface,
    formattedStart: string,
    formattedEnd: string,
    deleteTermin: Function,
    deleteSerientermin: Function
}

const DeletePopup = ({eventInfo, formattedStart, formattedEnd, deleteTermin, deleteSerientermin}: Props): React.JSX.Element => {

    const closeDeletePopup = ()=> {
        const deletePopup = document.getElementById('terminDeleteAbfrage');
        deletePopup.style.display = 'none';
    }
    return (
        <>
            <div className={"deletePopup"} id={"terminDeleteAbfrage"}>
                <img src={"../src/assets/closeBtn.png"} id="closePopup3"
                     title="Fenster schließen" onClick={closeDeletePopup}></img>
                <div className={"dayNumberPopUpSmall"} id={"terminBearbeitenAbfrageText"}>Es handelt sich um einen Serientermin!</div>
                <div className="event-time">{formattedStart + '-' + formattedEnd}</div>
                <div className="event-title">{eventInfo.title}</div>
                <div className={"deleteBtnLine"}>
                    <div className={"abbrechen-btn"} onClick={closeDeletePopup}>Abbrechen
                    </div>
                    <div id={'delete-btn'} onClick={()=> {deleteTermin()}}>Löschen
                    </div>
                    <div className={"serie-bearbeiten-btn"} style={{display: `block`}} onClick={()=> {deleteSerientermin()}}>Serie Löschen
                    </div>
                </div>
            </div>

        </>

    )
}

export default DeletePopup;