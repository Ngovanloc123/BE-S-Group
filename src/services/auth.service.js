import User from "../app/models/user.model.js"
import {NotFoundError, ConflictRequestError, AuthFailureError, BadRequestError} from "../handler/error.response.js";
import authUtil from "../utils/auth.util.js";

class AuthService {
    async register(userData) {
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            ConflictRequestError("Email already exists");
        }


        const hashedPassword = authUtil.hashPassword(userData.password);

        const newUser = new User({
            ...userData,
            password: hashedPassword,
        });

        return await newUser.save();
    } catch (err) {
        throw err;
    }
}

    async login(userData) {
        try {
            const user = await User.findOne({ email: userData.email });
            if (!user) throw new NotFoundError("User not found");

            const isPasswordValid = authUtil.comparePassword(userData.password, user.password);
            if (!isPasswordValid) throw new AuthFailureError("Password is not compare"); // Mật khẩu không đúng

            return user;
        } catch (err) {
            console.error("Error in login:", err.message);
            throw err; 
        }
    }
}

export default new AuthService()