import { Router } from "express";
import {createAzubi, deleteById, getAllUsers, getStandort, getUserById, updateAzubi} from "../handlers/users";

const userRouter: Router = Router();


// =>  api/users
userRouter.get('/')
// =>  api/users/getAll
userRouter.get('/getAll', getAllUsers);
// =>  api/users/getById/:id
userRouter.get('/getById/:id', getUserById);

// =>  api/users/getStandort/:azubiName
userRouter.get('/getStandort/:azubiKey', getStandort);


// =>  api/users/createUser
userRouter.post('/createAzubi', createAzubi);

// =>  api/users/deleteAzubiById/:id
userRouter.delete('/deleteAzubiById/:id', deleteById);

// =>  api/users/updateAzubi
userRouter.put('/updateAzubi', updateAzubi);
export default userRouter;