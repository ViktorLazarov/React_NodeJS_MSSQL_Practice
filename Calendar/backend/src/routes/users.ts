import { Router } from "express";
import {createAzubi, deleteById, getAllUsers, getUserById, updateAzubi} from "../handlers/users";

const router: Router = Router();


// =>  api/users
router.get('/')
// =>  api/users/getAll
router.get('/getAll', getAllUsers);
// =>  api/users/getById/:id
router.get('/getById/:id', getUserById);


// =>  api/users/createUser
router.post('/createAzubi', createAzubi);

// =>  api/users/deleteAzubiById/:id
router.delete('/deleteAzubiById/:id', deleteById);

// =>  api/users/updateAzubi
router.put('/updateAzubi', updateAzubi);
export default router;