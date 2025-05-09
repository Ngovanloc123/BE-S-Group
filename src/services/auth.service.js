import User from "../app/models/user.model.js"

import authUtil from "../utils/auth.util.js";

class AuthService {
    async register(userData) {
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
  
      const isMatch = authUtil.comparePassword(userData.password, user.password);
      if (!isMatch) return false;
  
      return user;
  }
}

export default new AuthService()