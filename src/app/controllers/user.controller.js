import userModel from "../models/user.model.js";

class UserController {
  getAllUsers(req, res) {
    const users = userModel.getAllUsers();
    res.status(200).json(users);
  }

  getUserById(req, res) {
    const user = userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  }

  addUser(req, res) {
    const newUser = userModel.addUser(req.body);
    if (!newUser) return res.status(500).json({ message: "Internal Server Error" });

    res.status(201).json({ message: "User created successfully", user: newUser });
  }

  updateUserFull(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Must have complete user data" });
    }

    const updatedUser = userModel.updateUserFull(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found or update failed" });

    res.status(200).json({ message: "User update successful", user: updatedUser });
  }

  updateUserPartial(req, res) {
    const updatedUser = userModel.updateUserPartial(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found or update failed" });

    res.status(200).json({ message: "User update successful", user: updatedUser });
  }

  deleteUser(req, res) {
    const success = userModel.deleteUser(req.params.id);
    if (!success) return res.status(404).json({ message: "User not found or delete failed" });

    res.status(200).json({ message: "Delete successful", id: req.params.id });
  }
}

export default new UserController();
