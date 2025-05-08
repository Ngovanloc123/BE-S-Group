import User from "../models/user.model.js";

class UserController {

    // [GET] /users
    getAll(req, res, next) {
        User.find()
            .then(users => {
                res.json(users);
            })
            .catch(next);
    }
    // [GET] /users/:id
    get(req, res, next) {
        User.findById({ _id: req.params.id })
            .then(user => res.json(user))
            .catch(next);
    }


    // [POST] /users/
    async create(req, res, next) {
        const newUser = new User(req.body);
        await newUser.save()
            .then(() => res.json({ message: "User created successfully", newUser }))
            .catch(next)
        
    }

    // [PUT] /users
    update(req, res, next) {
        User.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.json({ message: "User update successful", id: req.params.id }))
            .catch(next)
    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: "Delete successful", id: req.params.id }))
            .catch(next)
    }
}

export default new UserController();