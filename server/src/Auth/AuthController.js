const AuthService = require("./AuthService.js")
class AuthController{
    async registration(req, res){
        const user = req.body
        try {
            res.json(await AuthService.registration(user))
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    }
    async login(req, res){
        const user = req.body
        try {
            res.json(await AuthService.login(user))
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    }
}
module.exports = new AuthController()