import {AzubiCard} from "./AzubiCard.tsx";
import {User} from "../../types/User.ts";
// @ts-ignore
import '../../css/displayAzubis.css'
import UpdatePopup from "./UpdatePopup.tsx";
import React, {useEffect, useState} from "react";

type displayUsersProps = {
    users: User[]
}

export function DisplayAzubis({users}: displayUsersProps) {

    return (
        <>

            <div className="display-users">
                {users.map((user: User) => (
                    <div key={crypto.randomUUID()}>
                        <AzubiCard user={user}/>
                    </div>
                ))}
            </div>
        </>
    )
}