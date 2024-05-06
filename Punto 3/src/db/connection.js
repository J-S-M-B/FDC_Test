import pg from 'pg';

import { dbpg, dbserver } from '../config.js';

import { Connection, Request } from 'tedious';

export const getSQLServerConnection = async function connectToSqlServer() {

    try {
        const clientserver= await new Connection(dbserver);        
        clientserver.connect();        
        clientserver.on('connect', (err) => {
            if (err) {
                console.error('Error al conectar a SQL Server:', err);
                throw err;
            } else {
                console.log('Conectado correctamente a SQL Server');
                
                // Crear y ejecutar la consulta SELECT
                const request = new Request("SELECT e.Id as EmpleadoId, e.Nombre as NombreEmpleado, e.DepartamentoId, d.Nombre as NombreDepartamento FROM Empleado e INNER JOIN Departamento d ON e.DepartamentoId = d.Id", (err, rowCount, rows) => {
                    if (err) {
                        console.error('Error al ejecutar consulta SELECT:', err);
                        throw err;
                    } else {
                        console.log(rowCount + ' filas devueltas'); 

                        rows.forEach(row => {
                            const empleadoId = row[0].value;
                            const nombreEmpleado = row[1].value;
                            const departamentoId = row[2].value;
                            const nombreDepartamento = row[3].value;
                            console.log(`Empleado: ${empleadoId}, ${nombreEmpleado}, DepartamentoId: ${departamentoId}, NombreDepartamento: ${nombreDepartamento}`);
                        });
                    }
                });                
                clientserver.execSql(request);
            }
        });

        return clientserver;
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

