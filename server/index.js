const express = require("express")
const {json} = require("express")
const dotenv = require("dotenv")
dotenv.config()
const AuthRouter = require("./src/Auth/AuthRouter")
const DataRouter = require("./src/Data/DataRouter")
const mongoose = require("mongoose")

const PORT = process.env.PORT
const URL = process.env.URL

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(json())
app.use("/server", AuthRouter)
app.use("/data", DataRouter)

const start = async () => {
    try {
        await mongoose.connect(URL)
        app.listen(PORT, () => console.log("\nSUCCESSFULLY STARTED ON %i", PORT))
    } catch (e) {
        console.log(e)
    }
}
start().then()