import {Request, Response} from "express-serve-static-core";
import sql, {ConnectionPool, IResult} from "mssql";
import getConnection from "../connection";


export async function getAllTermins(req: Request, res: Response) {
    const pool: ConnectionPool = await getConnection();

    const result: IResult<any> = await pool.request()
        .query("SELECT t.[Terminkey], t.[Bezeichnung], t.[Start], t.[Ende], t.[Azubi], t.[Ganztägig], t.[SerienterminID], u.[Vorname], u.[Nachname] FROM [dbo].[Termine_Tab] t FULL JOIN [dbo].[Users_Tab] u ON t.[Azubi] = u.[Azubikey]");
    res.send(result.recordset);
}

export async function createTermin(req: Request, res: Response) {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input('bezeichnung', sql.VarChar(), req.body.bezeichnung)
            .input('start', sql.VarChar(), req.body.start)
            .input('end', sql.VarChar(), req.body.end)
            .input('azubi', sql.VarChar(), req.body.azubi ? req.body.azubi : 'No Azubi')
            .input('ganztag', sql.Int(), parseInt(req.body.ganztaegig))
            .input('serientermin', sql.Int(), parseInt(req.body.serientermin))
            .input('serienterminID', sql.Int(), parseInt(req.body.serienTerminID))
            .input('bundesland', sql.VarChar(), req.body.bundesland)
            .input('standort', sql.VarChar(), req.body.standort)
            .query('INSERT INTO [dbo].[Termine_Tab] ([Bezeichnung], [Start], [Ende], [Azubi], [Ganztägig], [Serientermin], [SerienterminID], [Bundesland], [Standort])' +
                ' OUTPUT inserted.* VALUES' +
                ' (@bezeichnung, @start, @end, @azubi, @ganztag, @serientermin, @serienterminID, @bundesland, @standort)');

        console.log('termin created!')

        res.status(200).send(result.recordset);

    } catch (err) {
        console.log(err)
        res.status(400).send({message: "Termin could not be created"});
    }

}

export async function updateTermin(req: Request, res: Response) {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input('id', sql.Int(), parseInt(req.body.id))
            .input('bezeichnung', sql.VarChar(), req.body.bezeichnung)
            .input('start', sql.VarChar(), req.body.start)
            .input('end', sql.VarChar(), req.body.end)
            .input('azubi', sql.VarChar(), req.body.azubi ? req.body.azubi : 'No Azubi')
            .input('ganztag', sql.Int(), parseInt(req.body.ganztaegig))
            .input('serientermin', sql.Int(), parseInt(req.body.serientermin))
            .input('serienterminID', sql.Int(), parseInt(req.body.serienTerminID))
            .input('bundesland', sql.VarChar(), req.body.bundesland)
            .input('standort', sql.VarChar(), req.body.standort)
            .query('UPDATE [dbo].[Termine_Tab] SET [Bezeichnung]=@bezeichnung, [Start]=@start, [Ende]=@end, [Azubi]=@azubi, [Ganztägig]=@ganztag, [Serientermin]=@serientermin, [SerienterminID]=@serienterminID, [Bundesland]=@bundesland, [Standort]=@standort WHERE [Terminkey]=@id');

        console.log('termin Updated!')

        res.status(200).send(result.recordset);

    } catch (err) {
        console.log(err)
        res.status(400).send({message: "Termin could not be updated"});
    }

}

export async function updateDraggedTermin(req: Request, res: Response) {
    console.log(req.body)
    // try {
    //     const pool = await getConnection();
    //
    //     const result = await pool
    //         .request()
    //         .input('id', sql.Int(), parseInt(req.body.id))
    //         .input('start', sql.VarChar(), req.body.newStart)
    //         .input('end', sql.VarChar(), req.body.newEnd)
    //         .query('UPDATE [dbo].[Termine_Tab] SET [Start]=@start, [Ende]=@end WHERE [Terminkey]=@id');
    //
    //     console.log('termin Updated after dragging!')
    //
    //     res.status(200).send(result.recordset);
    //
    // } catch (err) {
    //     console.log(err)
    //     res.status(400).send({message: "Termin could not be updated"});
    // }

}

export async function updateSerie(req: Request, res: Response) {
    try {
        const pool = await getConnection();

        await pool
            .request()
            .input('id', sql.Int(), parseInt(req.body.id))
            .input('bezeichnung', sql.VarChar(), req.body.bezeichnung)
            .input('azubi', sql.VarChar(), req.body.azubi ? req.body.azubi : 'No Azubi')
            .query('UPDATE [dbo].[Termine_Tab] SET [Bezeichnung]=@bezeichnung, [Azubi]=@azubi WHERE [SerienterminID]=@id');

        const result = await pool
            .request()
            .input('id', sql.Int(), parseInt(req.body.id))
            .input('bezeichnung', sql.VarChar(), req.body.bezeichnung)
            .input('azubi', sql.VarChar(), req.body.azubi ? req.body.azubi : 'No Azubi')
            .query('UPDATE [dbo].[Serientermine_Tab] SET [Bezeichnung]=@bezeichnung, [Azubi]=@azubi WHERE [ID]=@id');

        console.log('serie Updated!')

        res.status(200).send(result.recordset);

    } catch (err) {
        console.log(err)
        res.status(400).send({message: "Serie could not be updated"});
    }

}


export async function createSerien(req: Request, res: Response) {
    try {
        const pool = await getConnection();

        const result = await pool
            .request()
            .input('bezeichnung', sql.VarChar(), req.body.bezeichnung)
            .input('start', sql.VarChar(), req.body.start)
            .input('end', sql.VarChar(), req.body.end)
            .input('azubi', sql.VarChar(), req.body.azubi ? req.body.azubi : 'No Azubi')
            .input('inkrementInDays', sql.Int(), parseInt(req.body.inkrementInDays))
            .input('serienTerminAnzahl', sql.Int(), parseInt(req.body.serienTerminAnzahl))
            .query('INSERT INTO [dbo].[Serientermine_Tab] ([Bezeichnung], [Start], [Ende], [Azubi], [InkrementInDays], [SerienterminAnzahl])' +
                ' VALUES' +
                ' (@bezeichnung, @start, @end, @azubi, @inkrementInDays, @serienTerminAnzahl)');
        console.log('serientermin created!')

        const fetchLastSerientermin = await pool.request().query(` SELECT TOP 1 *
                                                                   FROM [dbo].[Serientermine_Tab]
                                                                   ORDER BY [ID] DESC `);
        const lastSerienTermin = fetchLastSerientermin.recordset[0];

        console.log(lastSerienTermin)

        res.status(200).send(lastSerienTermin);

    } catch (err) {
        console.log('Serien termin could not be created')
        console.log(err)
        res.status(400).send({message: "Serien termin could not be created"});
    }

}

export async function deleteTerminById(req: Request, res: Response) {
    const terminID: number = parseInt(req.params.id.split('-')[0]);
    const serieID: number = parseInt(req.params.id.split('-')[1]);
    console.log(terminID)
    console.log(serieID)
    try {
        const pool: ConnectionPool = await getConnection();

        await pool
            .request()
            .query(`DELETE
                    FROM [dbo].[Termine_Tab]
                    WHERE [Terminkey] = ${terminID}`);
        console.log(`DELETE termin with id: ${terminID}`)
        const serieTermins = await pool
            .request()
            .input('serieID', sql.Int(), serieID)
            .query("SELECT * FROM [dbo].[Termine_Tab] WHERE [SerienterminID] = @serieID");

        if(serieTermins.recordset.length === 0){
            await pool
                .request()
                .input('serieID', sql.Int(), serieID)
                .query('DELETE FROM [dbo].[Serientermine_Tab] WHERE [ID] = @serieID')
        }

        res.status(200).send({message: `Termin with id: \"${terminID}\" has been deleted!`})
    } catch (err) {
        console.log(err)
    }

}

export async function deleteSerienterminBySerienID(req: Request, res: Response) {
    const serienID: number = parseInt(req.params.serienID);
    console.log(serienID)
    try {
        const pool: ConnectionPool = await getConnection();

        await pool
            .request()
            .query(`DELETE
                    FROM [dbo].[Termine_Tab]
                    WHERE [SerienterminID] = ${serienID}`);

        await pool
            .request()
            .query(`DELETE
                    FROM [dbo].[Serientermine_Tab]
                    WHERE [ID] = ${serienID}`);

        console.log(`DELETE Serientermin with serienID: ${serienID}`)
        res.status(200).send({message: `Serie with serienID: \"${serienID}\" has been deleted!`})
    } catch (err) {
        console.log(err)
    }

}