import User from "../models/user.model.js";
import mongooseHelper  from '../../utils/mongoose.js';

class UserController {
    // [GET] /users/add
    add(req, res) {
        res.render("users/add");
    }

    // [GET] /users
    show(req, res, next) {
        User.find()
            .then(users => {
                res.render("users/index", { 
                    users: mongooseHelper.multipleMongooseToObject(users)
                 });
            })
            .catch(next);
    }

    // [GET] /users/edit/:id
    edit(req, res, next) {
        User.findById(req.params.id)
            .then(user => res.render("users/edit", { 
                user: mongooseHelper.mongooseToObject(user)
            }))
            .catch(next)
    }

    // [POST] /users/store
    store(req, res, next) {
        const newUser = new User(req.body);
        newUser.save()
            .then(() => res.redirect("/users"))
            .catch(next)
        
    }

    // [PUT] /users
    update(req, res, next) {
        User.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect("/users"))
            .catch(next)
    }

    // [DELETE] /users/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/users'))
            .catch(next)
    }
}

export default new UserController();
