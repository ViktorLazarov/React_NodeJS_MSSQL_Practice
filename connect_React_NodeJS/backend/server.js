import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {fetchUsers} from "./services/user/fetchUsers.js";
import {registerUser} from "./services/user/registerUser.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.json({message: "Hello World"})
});


app.get('/api/users', async (req, res) => {
    try {
        const users = await fetchUsers();

        console.log("users sent to the frontend")
        res.send(users.recordset);
    } catch (err) {
        res.status(500).json({error: 'Internal server error'});
    }
});

const user = {
    firstname: 'viktor111111',
    lastname: 'lazarov111111',
    username: 'John.Doe111111',
    password: '123456111111',
    email: 'john.doe@gmail.com111111'
}
app.get('/api/register', async (req, res) => {
    try{
        const response = await registerUser(user);
        res.status(201).json(response);
    } catch (error) {
        if (error.message === 'Please fill all the fields' ||
            error.message === 'Username is already registered' ||
            error.message === 'Email is already registered') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");

})