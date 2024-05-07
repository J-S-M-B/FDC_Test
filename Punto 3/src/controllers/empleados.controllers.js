import sql from "mssql";
import { getPostgresqlConnection, getSQLServerConnection } from "../db/connection.js";

export const getEmpleados = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();
    const resultsqlserver = await poolsqlserver.request().query('SELECT * FROM empleados');
    const resultpostgres = await poolpostgres.query('SELECT * FROM empleados');

    if (resultsqlserver.recordset.length === 0 && resultpostgres.rowCount === 0) {
        return res.status(404).json({ message: "No se encontraron empleados" });
    }
    return res.status(200).json({
        sqlserver: resultsqlserver.recordset,
        postgresql: resultpostgres.rows});
}

export const getEmpleado = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();

    const resultsqlserver = await poolsqlserver.request()
        .input("id", sql.Int, req.params.id)
        .query('SELECT * FROM empleados WHERE id = @id');

    const resultpostgres = await poolpostgres.query({
        text: 'SELECT * FROM empleados WHERE id = $1',
        values: [req.params.id]
    });

    if ((resultsqlserver.rowsAffected[0] && resultpostgres.rowCount[0]) === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    return res.status(200).json({
        sqlserver: resultsqlserver.recordset[0],
        postgresql: resultpostgres.rows[0]
    });
}

export const createEmpleado = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();

    const resultsqlserver = await poolsqlserver.request()
        .input("Nombre", sql.VarChar, req.body.Nombre)
        .input("DepartamentoId", sql.Int, req.body.DepartamentoId)
        .query("INSERT INTO Empleados (Nombre, DepartamentoId) VALUES (@Nombre, @DepartamentoId)");

    const resultpostgres = await poolpostgres.query({
        text: 'INSERT INTO Empleados (Nombre, DepartamentoId) VALUES ($1, $2)',
        values: [req.body.Nombre, req.body.DepartamentoId]
    })

    if (resultsqlserver.rowsAffected[0] === 1 && resultpostgres.rowCount === 1) {
        return res.status(201).json({ message: "Empleado creado exitosamente" });
    } else {
        return res.status(500).json({ message: "Error al crear empleado" });
    }

}

export const updateEmpleado = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();

    const resultsqlserver = await poolsqlserver.request()
        .input("id", sql.Int, req.params.id)
        .input("Nombre", sql.VarChar, req.body.Nombre)
        .input("DepartamentoId", sql.Int, req.body.DepartamentoId)
        .query('UPDATE empleados SET Nombre = @Nombre, DepartamentoId = @DepartamentoId WHERE id = @id');

    const resultpostgres = await poolpostgres.query({
        text: 'UPDATE empleados SET Nombre = $2, DepartamentoId = $3 WHERE id = $1',
        values: [req.params.id, req.body.Nombre, req.body.DepartamentoId]
    });

    if (resultsqlserver.rowsAffected[0] > 0 && resultpostgres.rowCount > 0) {
        return res.status(200).json({ message: "Empleado actualizado correctamente" });
    } else {
        return res.status(404).json({ message: "No se encontró el empleado a actualizar" });
    }
}

export const deleteEmpleado = async (req, res) => {
    
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();

    const resultsqlserver = await poolsqlserver.request()
        .input("id", sql.Int, req.params.id)
        .query('DELETE FROM empleados WHERE id = @id');

    const resultpostgres = await poolpostgres.query({
        text: 'DELETE FROM empleados WHERE id = $1',
        values: [req.params.id]
    });

    if (resultsqlserver.rowsAffected === 0 && resultpostgres.rowCount === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    
    if (resultsqlserver.rowsAffected > 0 || resultpostgres.rowCount > 0) {
        return res.status(200).json({ message: "Empleados eliminados correctamente" });
    }

}