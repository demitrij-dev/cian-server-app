const DataService = require("./DataService")
class DataController{
    async getAll(req, res){
        const filters = {
            type_of_estate: req.query.type_of_estate || "",
            type_of_rental: req.query.type_of_rental || "",
            rooms: req.query.rooms || [1, 2, 3, 4, 5],
            min_price: req.query.min_price || 0,
            max_price: req.query.max_price || Number.MAX_SAFE_INTEGER,
            address: req.query.address || "",
            square: parseInt(req.query.square || 0),
            flor: req.query.flor || 0,
        }
        try {
            res.status(200).json(await DataService.getAll(filters))
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    }
    async getOne(req, res){
        const {id} = req.params
        try {
            res.status(200).json(await DataService.getOne(id))
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    }
    async addOne(req, res){
        const newEstate = req.body
        try {
            res.status(200).json(await DataService.addOne(newEstate))
        } catch (e) {
            res.status(400).json({error: e.message})
        }
    }
}
module.exports = new DataController()