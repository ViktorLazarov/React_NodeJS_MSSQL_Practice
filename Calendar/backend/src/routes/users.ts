import { Router } from "express";
import {createAzubi, getAllUsers, getUserById} from "../handlers/users";

const router: Router = Router();


// =>  api/users
router.get('/')
// =>  api/users/getAll
router.get('/getAll', getAllUsers);
// =>  api/users/getById/:id
router.get('/getById/:id', getUserById);


// =>  api/users/createUser
router.post('/createAzubi', createAzubi);

export default router;