import sql from 'mssql';
import config from './dbConfig.js'; // Adjust the path if necessary

// Create a function to establish and return a connection pool
const getConnection = async () => {
    try {
        const pool = await sql.connect(config);
        console.log('Connected to the database');
        return pool; // Return the connection pool
    } catch (err) {
        console.error('Database connection failed:', err.message);
        throw err; // Re-throw the error for proper handling
    }
};

export default getConnection;