import userModel from "../models/user.model.js";

class UserController {
    // [GET] /users/add
    add(req, res) {
        res.status(200).render("users/add");
    }

    // [GET] /users
    async show(req, res) {
        const users = await userModel.getAllUsers();
        res.status(200).render("users/index", { users });
    }

    // [GET] /users/edit/:id
    async edit(req, res) {
        const user = await userModel.getUserById(req.params.id);
        if (!user)
            return res.status(404).render("users/error", {
                errors: ["Không tìm thấy user"],
            });

        res.status(200).render("users/edit", { user });
    }

    // [POST] /users/store
    async store(req, res) {
        const newUser = userModel.addUser(req.body);
        if (!newUser) {
            return res.status(500).render("users/error", {
                errors: ["Lỗi server"],
            });
        }
        res.redirect("/users");
    }

    // [PUT] /users
    async update(req, res) {
        
        const updatedUser = userModel.updateUser(req.body);
        if (!updatedUser)
            return res.status(500).render("users/error", {
                errors: ["Lỗi server"],
            });

        res.redirect("/users");
    }

    // [DELETE] /users/:id
    delete(req, res) {
        const success = userModel.deleteUser(req.params.id);
        if (!success)
            return res
                .status(404)
                .json({ message: "User not found or delete failed" });

        res.redirect('/users');
    }
}

export default new UserController();
