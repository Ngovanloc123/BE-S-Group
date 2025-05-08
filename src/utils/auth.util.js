

class AuthUtil {
    hashPassword(password) {
        const salt = "my_salt";
        let hash = "";

        for (let i = 0; i < password.length; i++) {
            hash += password.charCodeAt(i) + salt.charCodeAt(i % salt.length);
        }

        return `hashed_${hash}`;
    }

    comparePassword(rawPassword, hashedPassword) {
        const hashedRaw = this.hashPassword(rawPassword);
        return hashedRaw === hashedPassword;
    }
}

export default new AuthUtil();

