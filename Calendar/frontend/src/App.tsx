import React from "react";
// @ts-ignore
import './css/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AzubisPage from "./pages/AzubisPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CalendarPage from "./pages/CalendarPage.tsx";
import InfoPage from "./pages/InfoPage.tsx";



function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<HomePage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/calendar" element={<CalendarPage/>}/>
                    <Route path="/info" element={<InfoPage/>}/>
                    <Route path="/azubis" element={<AzubisPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
