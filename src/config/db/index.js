import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectString = process.env.CONNECT_STRING;

async function connect() {
    try {
        await mongoose.connect(connectString);
        console.log("Kết nối thành công");
        
    }
    catch (error) {
        console.log("Kết nối thất bại");
        
    }
}

export default {connect};