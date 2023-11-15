const AuthService = require("./AuthService.js")
class AuthController{
    async registration(req, res){
        const user = req.body
        try {
            res.json(await AuthService.registration(user))
        } catch (e) {
            res.status(402).json({message: e.message})
        }
    }
    async login(req, res){
        const user = req.body
        try {
            res.json(await AuthService.login(user))
        } catch (e) {
            res.status(402).json({message: e.message})
        }
    }
}
module.exports = new AuthController()