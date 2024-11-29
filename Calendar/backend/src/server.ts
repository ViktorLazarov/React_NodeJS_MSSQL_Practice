import express from "express";
import {Express, Request, Response} from "express-serve-static-core";
import cors from 'cors';
import bodyParser from "body-parser";
import userRouter from './routes/users';



const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/users', userRouter);


app.get('/',  (req: Request, res: Response) => {
    res.send('Hello World + fdgfdg!!');
});


app.listen(3010, () => {
    console.log('Server started on port 3010!');
});