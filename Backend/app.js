import express from "express"
import 'dotenv/config'
import cors from 'cors'
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

import UserRoute from "./routes/User.router.js";
app.use("/api/v1/user", UserRoute);


export { app };