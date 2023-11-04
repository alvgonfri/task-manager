import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/AuthRoutes.js";
import taskRoutes from "./routes/TaskRoutes.js";

const app = express();

const corsOptions = {
  credentials: true,
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
