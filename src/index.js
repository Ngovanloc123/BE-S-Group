import express from "express";
import dotenv from "dotenv";
import route from "./routers/index.router.js"
import errorHandler from "./middlewares/errorHandler.js";

import db from "./config/db/index.js";

db.connect();

dotenv.config();
const PORT = process.env.PORT;

const app = express();


app.use(express.json());

route(app);

// Middleware 404 - route không tồn tại
app.use((req, res, next) => {
  res.status(404).json({
      success: false,
      message: "Route not found"
  });
});

app.use(errorHandler);





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
