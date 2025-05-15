import authService from "../../services/auth.service.js";
import jwtUtil from "../../utils/jwt.util.js";

import { OK, CREATED } from "../../handler/success.response.js"



class AuthController {
    // Đăng ký xong, phải đăng nhập lại
    // [POST] /users/register
    async register(req, res, next) {
        await authService.register(req.body);

        return new CREATED({
        message: 'User created successfully'
        }).send(res);
    }

    // [POST] /users/login
    async login(req, res, next) {
        const user = await authService.login(req.body);

        // console.log(user);

        // Thông tin user tồn tại
        const accessToken = jwtUtil.generateAccessToken(user._id);
        const refreshToken = jwtUtil.generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
        });

        return new OK ({
            message: "Login successfully!",
            metadata: { accessToken: accessToken }
        }).send(res);
        
    }

    // [POST] /users/logout
    async logout(req, res, next) {
        res.clearCookie("refreshToken");
        return new OK ({
            message: "Logout successfully!"
        }).send(res);
    }

    // [POST] /users/processNewToken
    async processNewToken (req, res, next) {
        const refreshToken  = req.cookies.refreshToken;
        if (!refreshToken) {
            return AuthFailureError("Unauthorized" );
        }

        // Kiểm tra refreshToken có hợp lệ không
        const decoded = jwtUtil.verifyRefreshToken(refreshToken);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Tạo accessToken mới
        const newAccessToken = jwtUtil.generateAccessToken(decoded.id);
        
        return new OK ({
            message: "AccessToken refreshed successfully!",
            metadata: { accessToken: newAccessToken }
        }).send(res);
    }
}

export default new AuthController();
