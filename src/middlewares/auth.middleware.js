import jwtUtil from '../utils/jwt.util.js';

class AuthMiddleware {
    requiredAuth = (req, res, next) => {
        
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const decoded = jwtUtil.verifyToken(token);
            req.userId = decoded.id;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }
}

export default new AuthMiddleware();