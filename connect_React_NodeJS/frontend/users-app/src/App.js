import React, {useEffect, useState} from 'react';

const App = () => {

    const [users, setUser] = useState([]);

    const getUsers = () => {
        fetch('/api/users')
            .then(res => res.json())
            .then(json => setUser(json));
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div>
            {users.map((user) => {
                return <>
                    <div style={{border: "1px solid gray", width: "auto", minWidth: "400px"}}>
                        <h1>Firstname:{user.Firstname}</h1>
                        <h1>Lastname:{user.Lastname}</h1>
                        <h1>Username:{user.Username}</h1>
                        <h1>Email:{user.Email}</h1>
                    </div>
                </>
            })}
        </div>

    )
}


export default App;