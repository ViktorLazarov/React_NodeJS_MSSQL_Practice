import {Request, Response} from "express-serve-static-core";
import {UserInterface} from "../types/userInterface";
import getConnection from '../connection.ts';
import sql, {ConnectionPool, IResult} from "mssql";
import multer from 'multer';

export async function getAllUsers(req: Request, res: Response<UserInterface[]>) {
    const pool: ConnectionPool = await getConnection();

    const result: IResult<any> = await pool.request()
        .query("SELECT * FROM [dbo].[Users_Tab]");

    res.send(result.recordset);
}

export async function getUserById(req: Request, res: Response<UserInterface>) {
    const id: number = parseInt(req.params.id);
    const pool: ConnectionPool = await getConnection();

    const resultUser: IResult<any> = await pool
        .request()
        .query(`SELECT *
                FROM [dbo].[Users_Tab]
                WHERE [ID] = ${id}`);

    res.status(200).send(resultUser.recordset[0]);
}

export async function getStandort(req: Request, res: Response) {
    const azubiKey = req.params.azubiKey
    console.log(azubiKey)
    try {
        const pool: ConnectionPool = await getConnection();

        const standort = await pool
            .request()
            .input('azubiKey', azubiKey)
            .query(`SELECT [Standort]
                    FROM [dbo].[Users_Tab]
                    WHERE [Azubikey] = @azubiKey`);
        if (standort.recordset.length === 0) {
            res.status(404).json({error: 'Azubi not found'});
            console.log('no user')
        } else {
            console.log('standort fetched');
            res.status(200).json(standort.recordset[0]);
        }

    } catch (error) {
        console.error('Error fetching from DB:', error);
        res.status(500).json({error: 'Internal server error'});
    }
}

export async function deleteById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
        const pool: ConnectionPool = await getConnection();

        await pool
            .request()
            .query(`DELETE
                    FROM [dbo].[Users_Tab]
                    WHERE [ID] = ${id}`);
        console.log(`DELETE user with id: ${id}`)
        res.status(200).send({message: `User with id: \"${id}\" has been deleted!`})
    } catch (err) {
        console.log(err)
    }
}


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 50 * 1024 * 1024}
}).single('image');

export async function createAzubi(req: Request, res: Response) {
    upload(req, res, async (err) => {
        const newUser = req.body;
        const binaryData = req.file ? req.file.buffer : null;
        try {
            const pool = await getConnection();

            const result = await pool
                .request()
                .input('Azubikey', sql.VarChar, newUser.azubiKey)
                .input('Vorname', sql.VarChar, newUser.vorname)
                .input('Nachname', sql.VarChar, newUser.nachname)
                .input('Ausbildungsbeginn', sql.Date, newUser.ausbildungsbeginn)
                .input('Ausbildungsende', sql.Date, newUser.ausbildungsende)
                .input('Abteilung', sql.VarChar, newUser.abteilung)
                .input('Team', sql.VarChar, newUser.team)
                .input('Bundesland', sql.VarChar, newUser.bundesland)
                .input('Standort', sql.VarChar, newUser.standort)
                .input('Bild', sql.VarBinary(), binaryData)
                .query("INSERT INTO [dbo].[Users_Tab] " +
                    "([Azubikey], [Vorname], [Nachname], [Ausbildungsbeginn], [Ausbildungsende], [Abteilung], [Team], [Bundesland], [Standort], [Bild])" +
                    "OUTPUT inserted.* VALUES" +
                    " (@Azubikey, @Vorname, @Nachname, @Ausbildungsbeginn, @Ausbildungsende, @Abteilung, @Team, @Bundesland, @Standort, @Bild)");
            console.log("created!")
            res.status(200).send(result.recordset);
        } catch (err) {
            console.log(err)
            res.status(400).send({message: "UserInterface could not be created"});
        }
    })

}

export async function updateAzubi(req: Request, res: Response) {
    upload(req, res, async (err) => {
        const updatedUser = req.body;
        const binaryData = req.file ? req.file.buffer : null;
        try {
            const pool = await getConnection();

            const result = await pool
                .request()
                .input('ID', sql.Int(), updatedUser.ID)
                .input('Azubikey', sql.VarChar, updatedUser.azubiKey)
                .input('Vorname', sql.VarChar, updatedUser.vorname)
                .input('Nachname', sql.VarChar, updatedUser.nachname)
                .input('Ausbildungsbeginn', sql.Date, updatedUser.ausbildungsbeginn)
                .input('Ausbildungsende', sql.Date, updatedUser.ausbildungsende)
                .input('Abteilung', sql.VarChar, updatedUser.abteilung)
                .input('Team', sql.VarChar, updatedUser.team)
                .input('Bundesland', sql.VarChar, updatedUser.bundesland)
                .input('Standort', sql.VarChar, updatedUser.standort)
                .input('Bild', sql.VarBinary(), binaryData)
                .query("UPDATE [dbo].[Users_Tab] SET [Azubikey]=@Azubikey, [Vorname]=@Vorname, [Nachname]=@Nachname, [Ausbildungsbeginn]=@Ausbildungsbeginn, [Ausbildungsende]=@Ausbildungsende, [Abteilung]=@Abteilung, [Team]=@Team, [Bundesland]=@Bundesland, [Standort]=@Standort, [Bild]=@Bild WHERE [ID] = @ID");


            console.log(`Updated Azubi with id: \"${updatedUser.ID}\"`)
            res.status(200).send({message: `Updated Azubi with id: \"${updatedUser.ID}\"`});
        } catch (err) {
            console.log(err)
            res.status(400).send({message: "Azubi could not be updated"});
        }
    })

}

