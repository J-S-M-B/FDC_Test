import dotenv from 'dotenv';
dotenv.config();


export const dbserver = {
    server: process.env.DB_HOST,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_DATABASE,
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion:true
    }
}

export const dbpg = {
    user: process.env.DB_USER2,
    password: process.env.DB_PASSWORD2,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT2,
    database: process.env.DB_DATABASE,

};
