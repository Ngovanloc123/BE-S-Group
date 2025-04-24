import express from "express";
import dotenv from "dotenv";
import route from "./routers/index.router.js"

import db from "./config/db/index.js";

db.connect();

dotenv.config();
const PORT = process.env.PORT;

const app = express();


app.use(express.json());

route(app);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
