// @ts-ignore
import sql from 'mssql';
import config from './dbConfig'

async function getConnection () {
    return await sql.connect(config);
}

export default getConnection;