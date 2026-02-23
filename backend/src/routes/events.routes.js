import { Router } from "express";
import { raizPost, getAttendance } from "../controllers/events.controller.js";

const router = Router();

// POST /events para crear un nuevo evento con asistencias
router.post("/", raizPost);

// GET /events/:eventId/attendance para obtener las asistencias de un evento específico 
router.get("/:eventId/attendance", getAttendance);

export default router;