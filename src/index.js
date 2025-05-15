import express from "express";
import dotenv from "dotenv";
import route from "./routers/index.router.js"
import { errorHandler } from './handler/error-handler.js';
import cookieParser from "cookie-parser";

import db from "./config/db/index.js";

db.connect();

dotenv.config();
const PORT = process.env.PORT;

const app = express();


app.use(cookieParser());
app.use(express.json());

route(app);


app.use(errorHandler);


// Nếu router không tồn tại
app.use('*', (req, res) =>{
  res.status(404).json({error: "Resource not found"});
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
