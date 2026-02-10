import express from "express";
import "dotenv/config";
import cors from "cors";
import { auth } from "./lib/auth";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Better Auth handler
app.use((req, res, next) => {
  if (req.path.startsWith("/api/auth")) {
    return auth.handler(req, res);
  }
  next();
});

// Routes
app.use("/api", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
});