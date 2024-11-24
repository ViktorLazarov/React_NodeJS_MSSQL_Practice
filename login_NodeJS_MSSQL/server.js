const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sql = require('mssql');
const bcrypt = require('bcryptjs');

const app = express();
let initialPath = path.join(__dirname, 'public');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(initialPath));


// details to connect to the DB
const config = {
    user: 'viktorlazarov',
    password: '074624750aA!',
    server: 'WORK-STATION',
    database: 'test_NodeJS_DB',
    options: {
        trustServerCertificate: true,
        enableArithAbort: true,
        trustedConnections: false,
        instance: 'SQLEXPRESS'
    },
    port:1433
};

// display the homepage when visiting localhost:3000
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, 'index.html'));
})
// display the login page when visiting localhost:3000/login
app.get('/login', (req, res) => {
    res.sendFile(path.join(initialPath, 'login.html'));
})
// display the register page when visiting localhost:3000/register
app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, 'register.html'));
})


//return all the users from the Users table
app.get('/users', async (req, res) => {
    const pool = await sql.connect(config);
    const data =
        pool.request()
            .query('SELECT * FROM Users')
            .then(result => {
                res.json(result.recordsets[0]);
            });
});

app.post('/register-users', async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname.length || !lastname.length || !email.length || !password.length || !username.length) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }else {
        try {
            //connect to the DB
            const pool = await sql.connect(config);

            // check if the username already exists in the table
            const resultUsername = await pool.request()
                .input('username', sql.VarChar, username)
                .query('SELECT * FROM [dbo].[Users] WHERE [Username] = @username');

            if (resultUsername.recordset.length > 0) {
                console.log('Username already exists');
                return res.status(400).json({ message: 'Username is already registered' });
            }
            // check if the username already exists in the table
            const resultEmail = await pool.request()
                .input('email', sql.VarChar, email)
                .query('SELECT * FROM [dbo].[Users] WHERE [Email] = @email');

            if (resultEmail.recordset.length > 0) {
                console.log('Email already exists');
                return res.status(400).json({ message: 'Email is already registered' });
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
            // Send response
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({message: 'Server error'});
        }
    }
});

app.post('/login-user', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM [dbo].[Users] WHERE [Email] = @email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const user = result.recordset[0];

        const isPasswordMatch = await bcrypt.compare(password, user.Password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const userData = {
            firstname: user.Firstname,
            lastname: user.Lastname
            // You can include more user details here
        };

        res.status(200).json({
            message: 'Login successful!',
            user: userData
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})





app.listen(3000, (req, res) =>{
    console.log('Server started on port 3000!');
})