import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// console.log("JWT_SECRET:", process.env.JWT_SECRET);
// console.log("JWT_REFRESH_SECRET:", process.env.JWT_REFRESH_SECRET);


const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: 
        "15m",
        // "10s",
    });
}


const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
}


const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
}


const jwtUtil = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken
}

export default jwtUtil;


