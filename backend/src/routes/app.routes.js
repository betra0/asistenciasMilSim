import { Router } from "express";
import { bootstrap } from "../controllers/app.controller.js";

const router = Router();

router.get("/bootstrap", bootstrap);

export default router;