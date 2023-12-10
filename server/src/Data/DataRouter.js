const Router = require("express")
const router = new Router()
const DataController = require("./DataController")

router.get("/estate", DataController.getAll)
router.get("/estate/:id", DataController.getOne)
router.post("/estate", DataController.addOne)

module.exports = router