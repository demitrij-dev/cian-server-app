const {Schema, model} = require("mongoose")

const User = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    role: {type: String, required: true},

    name: {type: String},
    surname: {type: String},
    phone: {type: String},
    city: {type: String},
})

module.exports = model("User", User)