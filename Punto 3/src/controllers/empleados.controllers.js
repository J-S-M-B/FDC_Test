import sql from "mssql";
import { getPostgresqlConnection, getSQLServerConnection } from "../db/connection.js";


export const getEmpleados = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();

    const query = `
    SELECT DISTINCT
    E.Id,
    E.Nombre,
    E.DepartamentoId,
    D.Nombre AS NombreDepartamento,
    P.ResponsableId,
    P.Nombre AS NombreProyecto  
    FROM 
    Empleados E
    INNER JOIN
    Departamentos D ON E.DepartamentoId = D.Id
    LEFT JOIN
    Proyectos P ON E.Id = P.ResponsableId

`;

    const resultsqlserver = await poolsqlserver.request().query(query);

    const resultpostgres = await poolpostgres.query(query);

    if (resultsqlserver.recordset.length === 0 && resultpostgres.rowCount === 0) {
        return res.status(404).json({ message: "No se encontraron empleados" });
    }
    return res.status(200).json(resultsqlserver.recordset)
}

// export const getEmpleado = async (req, res) => {
//     const poolsqlserver = await getSQLServerConnection();
//     const poolpostgres = await getPostgresqlConnection();

//     const resultsqlserver = await poolsqlserver.request()
//         .input("id", sql.Int, req.params.id)
//         .query('SELECT * FROM empleados WHERE id = @id');

//     const resultpostgres = await poolpostgres.query({
//         text: 'SELECT * FROM empleados WHERE id = $1',
//         values: [req.params.id]
//     });

//     if ((resultsqlserver.rowsAffected[0] && resultpostgres.rowCount[0]) === 0) {
//         return res.status(404).json({ message: "Empleado no encontrado" });
//     }
//     return res.status(200).json(resultsqlserver.recordset);
// }

export const createEmpleado = async (req, res) => {
    const { Nombre, DepartamentoId, NombreProyecto } = req.body;

    try {
        const poolsqlserver = await getSQLServerConnection();
        const poolpostgres = await getPostgresqlConnection();
        
        // Crear empleado en SQL Server
        const resultsqlserver = await poolsqlserver.request()
            .input("Nombre", sql.VarChar, Nombre)
            .input("DepartamentoId", sql.Int, DepartamentoId)
            .query("INSERT INTO Empleados (Nombre, DepartamentoId) VALUES (@Nombre, @DepartamentoId); SELECT SCOPE_IDENTITY() AS EmpleadoId;");

        const empleadoIdSqlServer = resultsqlserver.recordset[0].EmpleadoId;

        // Crear empleado en PostgreSQL
        const resultpostgres = await poolpostgres.query({
            text: 'INSERT INTO Empleados (Nombre, DepartamentoId) VALUES ($1, $2) RETURNING id',
            values: [Nombre, DepartamentoId]
        });

        const empleadoIdPostgres = resultpostgres.rows[0].id;

        if (empleadoIdSqlServer && empleadoIdPostgres) {
            // Crear proyecto asociado al empleado
            await poolsqlserver.request()
                .input("NombreProyecto", sql.VarChar, NombreProyecto)
                .input("ResponsableId", sql.Int, empleadoIdSqlServer)
                .query('INSERT INTO Proyectos (Nombre, ResponsableId) VALUES (@NombreProyecto, @ResponsableId)');

            await poolpostgres.query({
                text: 'INSERT INTO Proyectos (Nombre, ResponsableId) VALUES ($1, $2)',
                values: [NombreProyecto, empleadoIdPostgres]
            });

            return res.status(201).json({ message: "Empleado y proyecto creados exitosamente" });
        } else {
            return res.status(500).json({ message: "Error al crear empleado y proyecto" });
        }
    } catch (error) {
        console.error("Error al crear empleado y proyecto:", error);
        return res.status(500).json({ message: "Error interno del servidor al crear empleado y proyecto" });
    }
}





export const updateEmpleado = async (req, res) => {
    const empleadoId = req.params.id;
    const { Nombre, DepartamentoId, NombreProyecto } = req.body;

    try {
        const poolsqlserver = await getSQLServerConnection();
        const poolpostgres = await getPostgresqlConnection();

        const empleadoSqlServer = await poolsqlserver.request()
            .input("id", sql.Int, empleadoId)
            .query('SELECT * FROM Empleados WHERE Id = @id');

        const empleadoPostgres = await poolpostgres.query({
            text: 'SELECT * FROM Empleados WHERE Id = $1',
            values: [empleadoId]
        });

        if (empleadoSqlServer.recordset.length === 0 && empleadoPostgres.rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        const resultsqlserver = await poolsqlserver.request()
            .input("id", sql.Int, empleadoId)
            .input("Nombre", sql.VarChar, Nombre)
            .input("DepartamentoId", sql.Int, DepartamentoId)
            .query('UPDATE Empleados SET Nombre = @Nombre, DepartamentoId = @DepartamentoId WHERE Id = @id');

        const resultpostgres = await poolpostgres.query({
            text: 'UPDATE Empleados SET Nombre = $2, DepartamentoId = $3 WHERE Id = $1',
            values: [empleadoId, Nombre, DepartamentoId]
        });

        if (NombreProyecto) {
            await poolsqlserver.request()
                .input("NombreProyecto", sql.VarChar, NombreProyecto)
                .input("id", sql.Int, empleadoId)
                .query('UPDATE Proyectos SET Nombre = @NombreProyecto WHERE ResponsableId = @id');

            await poolpostgres.query({
                text: 'UPDATE Proyectos SET Nombre = $1 WHERE ResponsableId = $2',
                values: [NombreProyecto, empleadoId]
            });
        }

        if (resultsqlserver.rowsAffected[0] > 0 || resultpostgres.rowCount > 0) {
            return res.status(200).json({ message: "Empleado actualizado correctamente" });
        } else {
            return res.status(404).json({ message: "No se encontró el empleado a actualizar" });
        }
    } catch (error) {
        console.error("Error al actualizar empleado:", error);
        return res.status(500).json({ message: "Error interno del servidor al actualizar empleado" });
    }
}



export const deleteEmpleado = async (req, res) => {
    const empleadoId = req.params.id;

    try {
        const poolsqlserver = await getSQLServerConnection();
        const poolpostgres = await getPostgresqlConnection();

        const proyectosAsociados = await poolsqlserver.request()
            .input("id", sql.Int, empleadoId)
            .query('SELECT COUNT(*) AS count FROM Proyectos WHERE ResponsableId = @id');

        if (proyectosAsociados.recordset[0].count > 0) {
            await poolsqlserver.request()
                .input("id", sql.Int, empleadoId)
                .query('UPDATE Proyectos SET ResponsableId = NULL WHERE ResponsableId = @id');

            await poolpostgres.query({
                text: 'UPDATE Proyectos SET ResponsableId = NULL WHERE ResponsableId = $1',
                values: [empleadoId]
            });
        }

        const resultsqlserver = await poolsqlserver.request()
            .input("id", sql.Int, empleadoId)
            .query('DELETE FROM Empleados WHERE Id = @id');

        const resultpostgres = await poolpostgres.query({
            text: 'DELETE FROM Empleados WHERE Id = $1',
            values: [empleadoId]
        });

        const empleadoEliminado =
            (resultsqlserver.rowsAffected !== undefined && resultsqlserver.rowsAffected[0] > 0) ||
            (resultpostgres.rowCount !== undefined && resultpostgres.rowCount > 0);

        if (!empleadoEliminado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        return res.status(200).json({ message: "Empleado eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
        return res.status(500).json({ message: "Error interno del servidor al eliminar empleado" });
    }
}
