const {Schema, model} = require("mongoose")

const Estate = new Schema({
    title: {type: String, require: true},
    price: {type: String, require: true},
    address: {type: String, require: true},
    contacts: {type: String, require: true},
    type_of_rental: {type: String, require: true},
    type_of_estate: {type: String, require: true},

    description: {type: String},
    photos: {type: [String], require: true, default: []},
    square: {type: String},
    rooms: {type: [String]},
    flor: {type: String},
})
module.exports = model("Estate", Estate)