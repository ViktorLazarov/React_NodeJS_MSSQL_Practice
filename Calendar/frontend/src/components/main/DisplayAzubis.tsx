import {AzubiCard} from "./AzubiCard.tsx";
import {UserInterface} from "../../types/UserInterface.ts";
// @ts-ignore
import '../../css/displayAzubis.css'
import UpdateAzubiPopup from "./UpdateAzubiPopup.tsx";
import React, {useEffect, useState} from "react";

type displayUsersProps = {
    users: UserInterface[]
}

export function DisplayAzubis({users}: displayUsersProps) {

    return (
        <>

            <div className="display-users">
                {users.map((user: UserInterface) => (
                    <div key={crypto.randomUUID()}>
                        <AzubiCard user={user}/>
                    </div>
                ))}
            </div>
        </>
    )
}