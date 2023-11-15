const express = require("express")
const {json} = require("express")
const dotenv = require("dotenv")
dotenv.config()
const AuthRouter = require("./src/Auth/AuthRouter")
const mongoose = require("mongoose")

const PORT = process.env.PORT
const URL = process.env.URL

const app = express()

app.use(json())
app.use("/server", AuthRouter)

const start = async () => {
    try {
        await mongoose.connect(URL)
        app.listen(PORT, () => console.log("\nSUCCESSFULLY STARTED ON %i", PORT))
    } catch (e) {
        console.log(e)
    }
}
start().then()