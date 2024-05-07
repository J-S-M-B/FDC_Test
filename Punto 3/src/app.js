import cors from "cors";
import express from 'express';
import empleadosRoutes from './routes/empleados.routes.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(empleadosRoutes);
export default app