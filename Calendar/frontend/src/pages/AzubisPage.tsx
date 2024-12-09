import {useEffect, useState} from 'react'
import {DisplayAzubis} from "../components/main/DisplayAzubis.tsx";
import {SideBar} from "../components/main/SideBar.tsx";
import {CreateButton} from "../components/inner/CreateButton.tsx";
import {Footer} from "../components/main/Footer.tsx";
import CreatePopup from "../components/main/CreatePopup.tsx";
// @ts-ignore
import "./pagesCSS/azubisPage.css"


function AzubisPage() {

    const [users, setUsers] = useState([])

    const getUsers =  async function () {
        await fetch('http://localhost:3010/api/azubis/getAll')
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            });
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <div className="main">
                <div className="azubis-sidebar">
                    <SideBar/>
                </div>
                <div className="left-side-container">
                    <DisplayAzubis users={users}/>
                    <CreateButton/>
                </div>
                <CreatePopup/>
                <Footer/>
            </div>
        </>
    )
}

export default AzubisPage
