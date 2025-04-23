import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/mySGroup');
        console.log("Kết nối thành công");
        
    }
    catch (error) {
        console.log("Kết nối thất bại");
        
    }
}

export default {connect};