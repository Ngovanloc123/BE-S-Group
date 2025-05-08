import User from "../models/user.model.js";

import userService  from "../../services/user.service.js";

class UserController {

    // [GET] /users
    getAll(req, res, next) {
        userService.getAll()
            .then(users => {
                res.json(users);
            })
            .catch(next);
    }
    // [GET] /users/:id
    get(req, res, next) {
        userService.getUserById(req.params.id )
            .then(user => res.json(user))
            .catch(next);
    }


    // [POST] /users/register
    register(req, res, next) {
        userService.register(req.body)
          .then(newUser => {
            res.json({ message: "Register successfully", newUser });
          })
          .catch(next);
    };

    // [POST] users/login
    login(req, res, next){
        userService.login(req.body)
            .then(user => {
            res.json({ message: "Login successful", user });
            })
            .catch(next);
    };

    // [PUT] /users
    update(req, res, next) {
        userService.updateUser(req.params.id, req.body)
            .then(() => res.json({ message: "User update successful", id: req.params.id }))
            .catch(next)
    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        userService.deleteUser(req.params.id)
            .then(() => res.json({ message: "Delete successful", id: req.params.id }))
            .catch(next)
    }
}

export default new UserController();