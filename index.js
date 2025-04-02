import express from "express";
import dotenv  from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const app = express();

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




// Khác nhau giữa require và import
// So sánh giữa Web server (Ngin, Apache) và Web BE

// nodemon: phát hiện thay đổi trong code
// tìm hiểu những gì vừa code và các folder ó trong project 