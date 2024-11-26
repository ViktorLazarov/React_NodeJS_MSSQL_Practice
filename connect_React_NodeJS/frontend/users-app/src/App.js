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
        <>
            <ul>
                {users.map((user) => {
                    return (
                        <li key={user.id}>
                            <ul id="user-element">
                                <li>Firstname:{user.name.split(' ')[0]}</li>
                                <li>Lastname:{user.name.split(' ')[1]}</li>
                                <li>Username:{user.username}</li>
                                <li>Email:{user.email}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </>

    )
}


export default App;