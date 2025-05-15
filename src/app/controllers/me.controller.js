import userService from "../../services/user.service.js"
import { OK, CREATED } from "../../handler/success.response.js"
class MeController {
    async getProfile(req, res) {
        const user = await userService.getUserById(req.userId)
        
        
        return new OK ({
            message: "Profile user",
            metadata: { user: user }
        }).send(res);
    }
}

export default new MeController()