import User from "../app/models/user.model.js"

import authUtil from "../utils/auth.util.js";

class AuthService {
    async register(userData) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            return null;
        }
        const hashedPassword = authUtil.hashPassword(userData.password);
        
    
        const newUser = new User({
          ...userData,
          password: hashedPassword
        });
    
        return await newUser.save();
    }

    async login(userData) {
      const user = await User.findOne({ email: userData.email });
      if (!user) return null;
      const isPasswordValid = authUtil.comparePassword(userData.password, user.password);
      if (!isPasswordValid) return false;
  
      return user;
  }
}

export default new AuthService()