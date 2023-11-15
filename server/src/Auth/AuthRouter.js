const Router = require("express")
const router = new Router()
const AuthController = require("./AuthController")

router.post("/registration", AuthController.registration)
router.post("/login", AuthController.login)

module.exports = router