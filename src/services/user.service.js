import User from "../app/models/user.model.js";

class UserService {
    async getAll() {
        try {
            return await User.find();
        } catch (err) {
            console.error("Lỗi query hàm getAll:", err.message);
            throw new Error("Failed to fetch all users");
        }
    }

    async getUserById(id) {
        try {
            return await User.findById({ _id: id });
        } catch (err) {
            console.error("Lỗi query hàm getUserById:", err.message);
            throw new Error("Failed to fetch user by ID");
        }
    }

    async updateUser(id, userData) {
        try {
            return await User.updateOne(
                { _id: id },
                { $set: userData }
            );
        } catch (err) {
            console.error("Lỗi query hàm updateUser:", err.message);
            throw new Error("Failed to update user");
        }
    }

    async deleteUser(id) {
        try {
            return await User.deleteOne({ _id: id });
        } catch (err) {
            console.error("Lỗi query hàm deleteUser:", err.message);
            throw new Error("Failed to delete user");
        }
    }
}

export default new UserService();