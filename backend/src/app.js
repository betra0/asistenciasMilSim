import express from "express";
import appRoutes from "./routes/app.routes.js";

const app = express();

app.use(express.json());

app.use("/app", appRoutes);

export default app;