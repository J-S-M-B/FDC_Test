import sql from "mssql";
import { getPostgresqlConnection, getSQLServerConnection } from "../db/connection.js";

export const getEmpleados = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();
    const resultsqlserver = await poolsqlserver.request().query('SELECT * FROM empleados');
    const resultpostgres = await poolpostgres.query('SELECT * FROM empleados');
    res.json({
        sqlServer: resultsqlserver.recordset,
        postgres: resultpostgres.rows,
    });

}

export const getEmpleado = (req, res) => {
    res.send('Obteniendo al empleado...')
}

export const createEmpleado = async (req, res) => {
    const poolsqlserver = await getSQLServerConnection();
    const poolpostgres = await getPostgresqlConnection();
    console.log(req.body)
    const resultsqlserver = await poolsqlserver.request()
    .input("Nombre", sql.VarChar, req.body.Nombre)
    .input("DepartamentoId", sql.Int, req.body.DepartamentoId)
    .query("INSERT INTO Empleados (Nombre, DepartamentoId) VALUES (@Nombre, @DepartamentoId)");
    
    const resultpostgresql = await poolpostgres.query({
        text: 'INSERT INTO Empleados (Nombre, DepartamentoId) VALUES ($1, $2)',
        values: [req.body.Nombre, req.body.DepartamentoId]
    })


    res.json({ Nombre: req.body.Nombre, DepartamentoId: req.body.DepartamentoId });
}

export const updateEmpleado = (req, res) => {
    res.send('Actualizando empleado...')
}

export const deleteEmpleado = (req, res) => {
    res.send('Eliminando empleado...')
}