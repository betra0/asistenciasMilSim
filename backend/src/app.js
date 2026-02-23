import express from "express";
import appRoutes from "./routes/app.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.use("/app", appRoutes);
app.use("/events", eventsRoutes);

export default app;