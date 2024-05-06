import app from './app.js';
import { getSQLServerConnection } from './db/connection.js';

app.listen(3000)

//getPostgresqlConnection();
getSQLServerConnection();

console.log("Iniciado...");