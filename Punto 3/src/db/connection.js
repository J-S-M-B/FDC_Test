import pkg from 'mssql';
import pg from 'pg';
import { dbpg, dbserver } from '../config.js';
const { ConnectionPool } = pkg;

export const getSQLServerConnection = async () => {
    try {
        const pool = new ConnectionPool(dbserver);
        await pool.connect();
        console.log('Conectado correctamente a SQL Server');
        return pool;
    } catch (error) {
        console.error('Error al conectar a SQL Server:', error);
        throw error;
    }
}

export const getPostgresqlConnection = async function connectToPostgreSQL() {
    try {
        const clientpg = await new pg.Pool({
            user: dbpg.user,
            password: dbpg.password,
            host: dbpg.host,
            port: dbpg.port,
            database: dbpg.database
        });
        console.log('Conectado correctamente a PostgreSQL');
        return clientpg;
    } catch (error) {
        console.error('Error al conectar a PostgreSQL:', error);
        throw error;
    }
}

