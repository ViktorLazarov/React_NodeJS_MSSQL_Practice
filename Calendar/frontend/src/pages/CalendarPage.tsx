import React from "react";
// @ts-ignore
import './pagesCSS/calendarPage.css'
import {SideBar} from "../components/main/SideBar.tsx";
import {Footer} from "../components/main/Footer.tsx";
import Calendar from "../components/main/Calendar.tsx";
import CreateTerminPopup from "../components/main/CreateTerminPopup.tsx";

function CalendarPage() {
    return (
        <>
            <div className={"main"}>
                <div className={"calendar-sidebar"}>
                    <SideBar/>
                </div>
                <div className={"calendar-left-side-container"}>
                    <Calendar/>
                    <CreateTerminPopup/>
                </div>
                <Footer/>
            </div>
        </>
    )
}


export default CalendarPage;


