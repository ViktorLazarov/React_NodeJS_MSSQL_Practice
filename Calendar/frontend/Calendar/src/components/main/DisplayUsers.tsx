import {UserCard} from "../inner/UserCard.tsx";
import {User} from "../../types/User.ts";
// @ts-ignore
import '../../css/displayUsers.css'

type displayUsersProps = {
    users: User[]
}

export function DisplayUsers({users}: displayUsersProps) {
    return (
        <>
            <div className="display-users">
                {users.map((user: User) => (
                    <div key={crypto.randomUUID()}>
                        <UserCard user={user}/>
                    </div>
                ))}
            </div>
        </>
    )
}