import express from "express"
import 'dotenv/config'

const app = express();
app.use(express.json());

import  UserRoute  from "./routes/User.router.js";
app.use("/api/v1/user", UserRoute);


export  {app};