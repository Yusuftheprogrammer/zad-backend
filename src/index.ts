import express from "express";
import "dotenv/config";
import cors from "cors";

import subjectRouter from "./routes/subjects";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use("/api/subjects", subjectRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}`);
});