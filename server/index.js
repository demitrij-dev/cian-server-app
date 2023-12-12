const express = require("express")
const {json} = require("express")
const dotenv = require("dotenv")
dotenv.config()
const AuthRouter = require("./src/Auth/AuthRouter")
const DataRouter = require("./src/Data/DataRouter")
const mongoose = require("mongoose")

const PORT = 3000
const URL = "mongodb+srv://root:root@ciandb.slhlhib.mongodb.net/"

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'https://www.postman.com/');
    res.header('Access-Control-Allow-Origin', 'https://web.postman.co/');
    res.header('Access-Control-Allow-Origin', 'https://cian-client-app.vercel.app/');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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