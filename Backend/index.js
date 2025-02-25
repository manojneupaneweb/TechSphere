import { app } from "./app.js";
import {ConnectDB} from "./Config/Connect.js";

const port = process.env.PORT;

ConnectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
