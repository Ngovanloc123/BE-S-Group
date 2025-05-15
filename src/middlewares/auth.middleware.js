import jwtUtil from '../utils/jwt.util.js';

class AuthMiddleware {
    requiredAuth = (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if(!token) return res.sendStatus(401);
            // console.log(token);
            
            const decoded = jwtUtil.verifyToken(token);
            req.userId = decoded.id;
            next();
        }
        catch (err) {
            if(err.name == 'TokenExpiredError'){
                return res.status(403).json({ msg: "Refresh token expired" });
            }
            return res.status(403).json({ msg: "Invalid refresh token" });
    
        }
    }
}

export default new AuthMiddleware();