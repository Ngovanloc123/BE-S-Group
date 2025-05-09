import User from "../app/models/user.model.js"



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

    

    async deleteUser(id) {
        
        return await User.deleteOne({ _id: id })
    }
}
    


export default new UserService();