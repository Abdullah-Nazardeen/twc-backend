import express, { Application } from "express";
import authRoutes from "./routes/auth";
import contactRoutes from "./routes/contact";
const cors = require("cors");
const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use("/api", authRoutes, contactRoutes);

export default app;
