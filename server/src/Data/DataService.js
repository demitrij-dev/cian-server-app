const Estate = require("./DataScheme")
class DataService{
    async getAll(filters){
        const searchedEstate = {
            type_of_rental: { $regex: filters.type_of_rental, $options: "i" },
            type_of_estate: { $regex: filters.type_of_estate, $options: "i" },
            price: {$gte: filters.min_price, $lte: filters.max_price},
            square: {$gte: (filters.square || 10) - 10, $lte: (filters.square ? filters.square + 10 : 99999)},
            flor: filters.flor || {$gte: 0, $lte: Number.MAX_SAFE_INTEGER},
            rooms: { $in: (filters.rooms.split(",")) },
            address: { $regex: filters.address, $options: "i" }
        }
        return Estate.find(searchedEstate)
    }
    async getOne(id){
        return Estate.findById(id)
    }
    async addOne(newDBItem){
        if(!DataService.validateDBItem(newDBItem)) throw Error("Неверно заполненены данные")

        const newEstate = new Estate({
            type_of_rental: newDBItem.type_of_rental,
            type_of_estate: newDBItem.type_of_estate,
            title: newDBItem.title,
            price: newDBItem.price,
            address: newDBItem.address,
            contacts: newDBItem.contacts,

            description: newDBItem.description,
            photos: newDBItem.photos,
            square: newDBItem.square,
            rooms: newDBItem.rooms,
            flor: newDBItem.flor,
        })
        await newEstate.save()
        return {message: "Successfully saved"}
    }
    static validateDBItem(newDBItem){
        return true;
    }
}
module.exports = new DataService()