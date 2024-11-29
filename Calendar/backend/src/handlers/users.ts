import {Request, Response} from "express-serve-static-core";
import {CreateUserDto} from "../dtos/CreateUser.dto";
import {UserInterface} from "../types/userInterface";
import getConnection from '../connection.ts';
import sql, {ConnectionPool, IResult} from "mssql";

export async function getAllUsers(req: Request, res: Response<UserInterface[]>) {
    const pool:ConnectionPool = await getConnection();

    const result:IResult<any> = await pool.request()
        .query("SELECT * FROM [dbo].[Users_Tab]");

    res.send(result.recordset);
}

export async function getUserById(req: Request, res: Response<UserInterface>) {
    const id: number = parseInt(req.params.id);
    const pool: ConnectionPool = await getConnection();

    const resultUser: IResult<any> = await pool
        .request()
        .query(`SELECT * FROM [dbo].[Users_Tab] WHERE [ID] = ${id}`);

    res.status(200).send(resultUser.recordset[0]);
}

export async function createAzubi(req: Request<{}, {}, CreateUserDto>, res: Response) {

    const newUser: UserInterface = req.body;
    console.log(newUser)
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input('Azubikey', sql.VarChar, newUser.AzubiKey)
            .input('Vorname', sql.VarChar, newUser.Vorname)
            .input('Nachname', sql.VarChar, newUser.Nachname)
            .input('Ausbildungsbeginn', sql.Date, newUser.Ausbildungsbeginn)
            .input('Ausbildungsende', sql.Date, newUser.Ausbildungsende)
            .input('Abteilung', sql.VarChar, newUser.Abteilung)
            .input('Team', sql.VarChar, newUser.Team)
            .input('Bundesland', sql.VarChar, newUser.Bundesland)
            .input('Standort', sql.VarChar, newUser.Standort)
            .input('Bild', sql.VarBinary(), newUser.Bild)
            .query("INSERT INTO [dbo].[Users_Tab] " +
                "([Azubikey], [Vorname], [Nachname], [Ausbildungsbeginn], [Ausbildungsende], [Abteilung], [Team], [Bundesland], [Standort], [Bild])" +
                "OUTPUT inserted.* VALUES" +
                " (@Azubikey, @Vorname, @Nachname, @Ausbildungsbeginn, @Ausbildungsende, @Abteilung, @Team, @Bundesland, @Standort, @Bild)");

        res.status(200).send(result.recordset);
    } catch (error) {
        res.status(400).send({message: "User could not be created"});
    }

}

