import getConnection from "../../db/db.js";
import sql from "mssql";
import bcrypt from "bcrypt";



export const registerUser = async (userData) => {
    const { firstname, lastname, username, email, password } = userData;

    try {
        //connect to the DB
        const pool = await getConnection();

        // check if the username already exists in the table
        const resultUsername = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM [dbo].[Users] WHERE [Username] = @username');

        if (resultUsername.recordset.length > 0) {
            console.log('Username already exists');
            throw new Error('Username is already registered');
        }
        // check if the email already exists in the table
        const resultEmail = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM [dbo].[Users] WHERE [Email] = @email');

        if (resultEmail.recordset.length > 0) {
            console.log('Email already exists');
            throw new Error('Email is already registered');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert the users data into the database
        await pool.request()
            .input('firstname', sql.VarChar, firstname)
            .input('lastname', sql.VarChar, lastname)
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .input('email', sql.VarChar, email)
            .query('INSERT INTO [dbo].[Users]([Firstname], [Lastname], [Username], [Password], [Email])VALUES(@firstname, @lastname, @username, @password, @email)'
            );
        console.log('User successfully registered');
        return { message: 'User registered successfully' };
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message: error.message});
    }

}
