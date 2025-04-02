import express from "express";
import dotenv  from "dotenv";

dotenv.config();
import userRouter from "./routers/user.router.js";

const PORT = process.env.PORT;


const app = express();

app.use(express.json());

app.use(userRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome",
        name: "Node.js App",
        version: "1.0.0"
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});