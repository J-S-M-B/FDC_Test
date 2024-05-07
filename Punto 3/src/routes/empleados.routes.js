import { Router } from "express";
import { createEmpleado, deleteEmpleado, getEmpleados, updateEmpleado } from "../controllers/empleados.controllers.js";

const router = Router();

router.get('/empleados', getEmpleados);

//router.get('/empleados', getEmpleado);

router.post('/empleados', createEmpleado);

router.put('/empleados/:id', updateEmpleado);

router.delete('/empleados/:id', deleteEmpleado);

export default router;