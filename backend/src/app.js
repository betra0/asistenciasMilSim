import express from "express";
import appRoutes from "./routes/app.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import authRoutes from "./auth/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // acepta cualquier origin dinámicamente
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/app", appRoutes);
app.use("/events", eventsRoutes);
app.use("/auth", authRoutes);

export default app;