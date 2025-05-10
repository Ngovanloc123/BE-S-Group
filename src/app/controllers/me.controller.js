import userService from "../../services/user.service.js"

class MeController {
    async getProfile(req, res) {
        try {
            const user = await userService.getUserById(req.userId)
            

            // console.log(user);
            
            res.status(200).json({ message:"Profile user", user: user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new MeController()