import dotenv from 'dotenv';
dotenv.config();


export const dbserver = {
    server: process.env.DB_HOST,
    user: process.env.DB_USER, // Cambia userName a user
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true
    }
};


export const dbpg = {
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT2,
    database: process.env.DB_DATABASE,

};
