import { Router} from "express";
import {
    createSerien,
    createTermin,
    deleteSerienterminBySerienID,
    deleteTerminById,
    getAllTermins, updateDraggedTermin, updateSerie,
    updateTermin
} from "../handlers/termins";

const terminRouter: Router = Router();

// =>  api/termins/getAll
terminRouter.get('/getAll', getAllTermins);

// =>  api/termins/createTermin
terminRouter.post('/createTermin', createTermin);

// =>  api/termins/updateTermin
terminRouter.put('/updateTermin', updateTermin);

// =>  api/termins/updateTermin
terminRouter.put('/updateDraggedTermin', updateDraggedTermin);

// =>  api/termins/updateSerie
terminRouter.put('/updateSerie', updateSerie);

// =>  api/termins/createSerien
terminRouter.post('/createSerien', createSerien);

// =>  api/termins/deleteTermin/:id
terminRouter.delete('/deleteTermin/:id', deleteTerminById);

// =>  api/termins/deleteSerientermin/:id
terminRouter.delete('/deleteSerientermin/:serienID', deleteSerienterminBySerienID);



export default terminRouter;