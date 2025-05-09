import authService from "../../services/auth.service.js";

const handleErrors = (err) => {
    console.log(err.message, err.code);
    
}

class AuthController {
    // [POST] /users/register
        register(req, res, next) {
            authService.register(req.body)
              .then(newUser => {
                res.status(201).json({ message: "Register successfully", newUser });
              })
              .catch(err => { handleErrors(err) });
        };
    
        // [POST] users/login
        async login(req, res) {
            try {
                const result = await authService.login(req.body);
        
                if (result === null) {
                    return res.status(404).json({ message: "Email does not exist" });
                }
        
                if (result === false) {
                    return res.status(401).json({ message: "Incorrect password" });
                }
        
                // login success
                return res.status(200).json({ message: "Login successful", user: result });
        
            } catch (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
        }
        
}

export default new AuthController();