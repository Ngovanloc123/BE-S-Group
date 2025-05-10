import bcrypt from 'bcrypt';

class AuthUtil {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(password, salt);
    }


    comparePassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }

    


}


export default new AuthUtil();

