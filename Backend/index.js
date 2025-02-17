import { app } from "./app.js";
import ConnectDB from './Config/Connect.js';
const port = process.env.PORT

ConnectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port || 8080, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((err) => {
    console.error("Error connecting to database", err);
    process.exit(1);
})