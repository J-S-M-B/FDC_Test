import express from 'express';
import empleadosRoutes from './routes/empleados.routes.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(empleadosRoutes);
export default app