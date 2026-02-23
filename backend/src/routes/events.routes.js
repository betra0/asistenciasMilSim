import { Router } from "express";
import { raizPost } from "../controllers/events.controller.js";

const router = Router();

// POST /events para crear un nuevo evento con asistencias
router.post("/", raizPost);

export default router;