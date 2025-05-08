import User from "../app/models/user.model.js"
import authUtil from "../utils/auth.util.js";


class UserService {
    async getAll() {
        return await User.find();
    }

    async getUserById(id) {
        return await User.findById({ _id: id });
    }

    async updateUser(id, userData) {
        return await User.updateOne(
            { _id: id }, 
            { $set: userData }
          );
    }

    register(userData) {
        const hashedPassword = authUtil.hashPassword(userData.password);
    
        const newUser = new User({
          ...userData,
          password: hashedPassword
        });
    
        return newUser.save();
    }

    async login(userData) {
        return await User.findOne({ email: userData.email })
          .then(user => {
            if (!user) {
              return Promise.reject(new Error("Email does not exist"));
            }
    
            const isMatch = authUtil.comparePassword(userData.password, user.password);
            if (!isMatch) {
              return Promise.reject(new Error("Incorrect password"));
            }
    
            return user;
          });
      }

    async deleteUser(id) {
        
        return await User.deleteOne({ _id: id })
    }
}
    


export default new UserService();