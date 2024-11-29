import {useEffect, useState} from 'react'
// @ts-ignore
import './css/App.css'
import {DisplayUsers} from "./components/main/DisplayUsers.tsx";
import {SideBar} from "./components/main/SideBar.tsx";
import {CreateButton} from "./components/inner/CreateButton.tsx";
import {Footer} from "./components/main/Footer.tsx";
import CreatePopup from "./components/main/CreatePopup.tsx";



function App() {

    const [users, setUsers] = useState([])

    const getUsers =  function () {
             fetch('http://localhost:3010/api/users/getAll')
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
                <SideBar/>
                <div className="left-side-container">
                    <DisplayUsers users={users}/>
                    <CreateButton/>
                </div>
                <CreatePopup/>
                <Footer/>
            </div>


        </>
    )
}

export default App
