// @ts-ignore
import './pagesCSS/infoPage.css'
import {SideBar} from "../components/main/SideBar.tsx";
import {Footer} from "../components/main/Footer.tsx";

function CalendarPage (){
    return (
        <>
            <div className={"main"}>
                <div className={"info-sidebar"}>
                    <SideBar/>
                </div>
                <div className={"left-side-container"}>
                    <h2>This is the Info Page</h2>
                </div>
                <Footer/>
            </div>

        </>
    )
}


export default CalendarPage;


