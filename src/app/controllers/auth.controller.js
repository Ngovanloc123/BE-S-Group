import authService from "../../services/auth.service.js";
import jwtUtil from "../../utils/jwt.util.js";

class AuthController {
    // Đăng ký xong, phải đăng nhập lại
    // [POST] /users/register
    async register(req, res, next) {
        try {
            const result = await authService.register(req.body);
            if (result === null) {
                return res
                    .status(400)
                    .json({ message: "Email already exists" });
            }
            return res
                .status(201)
                .json({ message: "User created successfully", user: result });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // [POST] /users/login
    async login(req, res) {
        try {

            // Kiểm tra email có tồn tại không, nếu có thì kiểm tra mật khẩu
            const result = await authService.login(req.body);
            if (result === null) {
                return res.status(404).json({ message: "Email does not exist" });
            }
            if (result === false) {
                return res.status(400).json({ message: "Password is incorrect" });
            }

            // Thông tin user tồn tại
            const accessToken = jwtUtil.generateAccessToken(result._id);
            const refreshToken = jwtUtil.generateRefreshToken(result._id);


            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                // maxAge: 15 * 60 * 1000, // 15 phút
                maxAge: 10 * 1000, // 10 giây
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
            });

            return res.status(200).json({
                message: "Login successful",
                accessToken,
                refreshToken,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // [POST] /users/logout
    async logout(req, res) {
        try {
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            return res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // [POST] /users/refresh-token
    async refreshToken(req, res) {
        try {
            // Kiểm tra accessToken có còn hiệu lực không
            const token = req.cookies.accessToken;
            if (token) {
                return res.status(200).json({ message: "AccessToken is still valid" });
            }


            // Nếu accessToken đã hết hạn, kiểm tra refreshToken
            const refreshToken  = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Kiểm tra refreshToken có hợp lệ không
            const decoded = jwtUtil.verifyRefreshToken(refreshToken);
            if (!decoded) {
                return res.status(401).json({ message: "Invalid refresh token" });
            }

            // Tạo accessToken mới
            const newAccessToken = jwtUtil.generateAccessToken(decoded.id);

            // Đẩy accessToken mới lên cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                // maxAge: 15 * 60 * 1000, // 15 phút
                maxAge: 10 * 1000, // 10 giây
            });
            
            return res.status(200).json({
                message: "AccessToken refreshed successfully",
                accessToken: newAccessToken,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new AuthController();
