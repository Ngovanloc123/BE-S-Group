import userService from "../../services/user.service.js";
import jwtUtil from "../../utils/jwt.util.js";
import nodemailer from "nodemailer";

import { OK, CREATED } from "../../handler/success.response.js";
import {
    NotFoundError,
    ConflictRequestError,
    AuthFailureError,
    BadRequestError,
} from "../../handler/error.response.js";

import authUtil from "../../utils/auth.util.js";

import dotenv from "dotenv";

dotenv.config();

class UserController {
    // [GET] /users
    getAll(req, res, next) {
        userService
            .getAll()
            .then((users) => {
                res.json(users);
            })
            .catch(next);
    }
    // [GET] /users/:id
    get(req, res, next) {
        userService
            .getUserById(req.params.id)
            .then((user) => res.json(user))
            .catch(next);
    }

    // [PUT] /users
    update(req, res, next) {
        userService
            .updateUser(req.params.id, req.body)
            .then(() =>
                res.json({
                    message: "User update successful",
                    id: req.params.id,
                })
            )
            .catch(next);
    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        userService
            .deleteUser(req.params.id)
            .then(() =>
                res.json({ message: "Delete successful", id: req.params.id })
            )
            .catch(next);
    }

    async forgetPassword(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);

            const user = await userService.getUserById(id);

            if (!user) {
                return res.status(400).send({ message: "User not found" });
            }

            const token = jwtUtil.generateAccessToken(id);
            const transporter = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                auth: {
                    user: process.env.MY_GMAIL,
                    pass: process.env.MY_PASSWORD,
                },
            });
            const receiver = {
                from: "62205ngovanloc@gmail.com",
                to: user.email,
                subject: "Password Reset Request",
                text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/api/password-reset/${token}`,
            };

            await transporter.sendMail(receiver);
            return new OK({
                message: "Password reset link send successfully on your gmail account",
            }).send(res);
        } catch (err) {
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { token } = req.params;
            const { password } = req.body;

            // console.log(token);
            // console.log(password);

            if (!password) {
                throw new NotFoundError("Require new password");
            }


            const decode = jwtUtil.verifyToken(token);

            console.log(decode.id);
            

            const user = await userService.getUserById(decode.id);
            
            

            const newHashPassword = authUtil.hashPassword(password);

            user.password = newHashPassword;
            await user.save();
            return new OK({
                message: "Password reset successfully",
                metadata: user,
            }).send(res);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserController();
