import User from "../app/models/user.model.js";

class Validator {
    constructor() {
        this.regexEmail = /^[0-9a-zA-Z._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    }

    checkName(name, errors) {
        if (!name || name.length < 5) {
            errors.push("Tên phải hơn 5 ký tự");
        }
    }

    checkAge(age, errors) {
        if (!age || age <= 18) {
            errors.push("Phải lớn hơn 18 tuổi");
        }
    }

    checkEmailFormat(email, errors) {
        if (!this.regexEmail.test(email)) {
            errors.push("Không đúng định dạng email");
        }
    }

    checkPassword(password, errors) {
        if (!password || password.length < 8) {
            errors.push("Password ít nhất 8 ký tự!");
        }
    }

    async checkDuplicateEmail(email, id, errors) {
        const condition = id ? { email, _id: { $ne: id } } : { email };
        const found = await User.findOne(condition);
        if (found) {
            errors.push("Email đã được đăng ký");
        }
    }

    validateRegisterUser = async (req, res, next) => {
        const { name, age, email, password } = req.body;
        const errors = [];

        this.checkName(name, errors);
        this.checkAge(age, errors);
        this.checkEmailFormat(email, errors);
        this.checkPassword(password, errors);
        await this.checkDuplicateEmail(email, null, errors);

        if (errors.length > 0) {
            return res.status(400).json({ message: "error", errors });
        }

        next();
    };

    validateUpdateUser = async (req, res, next) => {
        const { name, age, email, password } = req.body;
        const { id } = req.params;
        const errors = [];

        if (name) this.checkName(name, errors);
        if (age) this.checkAge(age, errors);
        if (email) {
            this.checkEmailFormat(email, errors);
            await this.checkDuplicateEmail(email, id, errors);
        }
        if (password) this.checkPassword(password, errors);

        if (errors.length > 0) {
            return res.status(400).json({ message: "error", errors });
        }

        next();
    };

    validateLoginUser = (req, res, next) => {
        const { email, password } = req.body;
        const errors = [];

        this.checkEmailFormat(email, errors);
        this.checkPassword(password, errors);

        this.checkEmailFormat(email, errors);

        if (errors.length > 0) {
            return res.status(400).json({ message: "error", errors });
        }

        next();
    };

    // validateLoginUser = async (req, res, next) => {
    //   const { email, password } = req.body;

    // }
}

export default new Validator();
