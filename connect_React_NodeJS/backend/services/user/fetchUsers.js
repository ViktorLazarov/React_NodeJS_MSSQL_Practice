import getConnection from "../../db/db.js";


export const fetchUsers = async () => {
    try {
        const pool = await getConnection();
        const result = pool
            .request()
            .query('SELECT * FROM [dbo].[Users]');

        return result;
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}