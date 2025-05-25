import express from "express"
import 'dotenv/config'
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);



import UserRoute from "./routes/User.route.js";
import ProductRoute from './routes/Product.route.js'
import CategoryRoute from './routes/Category.route.js'
import OrderRoute from './routes/Order.route.js'
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/order", OrderRoute);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export { app };
