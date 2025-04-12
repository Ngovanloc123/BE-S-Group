import userModel from "../models/user.model.js";

class UserController {
    addView(req, res) {
        res.status(200).render("users/add");
    }

    async getAllUsers(req, res) {
        const users = await userModel.getAllUsers();
        res.status(200).render("users/index", { users });
    }

    async getUserById(req, res) {
        const user = await userModel.getUserById(req.params.id);
        if (!user) return res.status(404).render("users/error", {
            errors: ["Không tìm thấy user"],
        });

        // res.status(200).json(user);
        res.status(200).render("users/edit", { user });
    }

    async upsertUser(req, res) {
        const { id } = req.body;

        if (!id) {
            const newUser = userModel.addUser(req.body);
            if (!newUser) {
                return res.status(500).render("users/error", {
                    errors: ["Lỗi server"],
                });
            }

            const users = await userModel.getAllUsers();
            res.status(201).render("users/index", { users });
        } else {
            const updatedUser = userModel.updateUser(req.body);
            if (!updatedUser) return res.status(500).render("users/error", {
                errors: ["Lỗi server"],
            });

            const users = await userModel.getAllUsers();
            res.status(200).render("users/index", { users });
        }
    }

    // updateUserFull(req, res) {
    //     const { name, email, password } = req.body;
    //     if (!name || !email || !password) {
    //         return res
    //             .status(400)
    //             .json({ message: "Must have complete user data" });
    //     }

    //     const updatedUser = userModel.updateUserFull(req.params.id, req.body);
    //     if (!updatedUser)
    //         return res
    //             .status(404)
    //             .json({ message: "User not found or update failed" });

    //     res.status(200).json({
    //         message: "User update successful",
    //         user: updatedUser,
    //     });
    // }

    // updateUserPartial(req, res) {
    //     const updatedUser = userModel.updateUserPartial(
    //         req.params.id,
    //         req.body
    //     );
    //     if (!updatedUser)
    //         return res
    //             .status(404)
    //             .json({ message: "User not found or update failed" });

    //     res.status(200).json({
    //         message: "User update successful",
    //         user: updatedUser,
    //     });
    // }

    deleteUser(req, res) {
        const success = userModel.deleteUser(req.params.id);
        if (!success)
            return res
                .status(404)
                .json({ message: "User not found or delete failed" });

        res.status(200).json({
            message: "Delete successful",
            id: req.params.id,
        });
    }
}

export default new UserController();
