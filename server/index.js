const express = require("express")
const {json} = require("express")
const dotenv = require("dotenv")
dotenv.config()
const AuthRouter = require("./src/Auth/AuthRouter")
const DataRouter = require("./src/Data/DataRouter")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 8080;
const URL = process.env.URL || "mongodb+srv://root:root@ciandb.slhlhib.mongodb.net/"

const app = express()

const allowedOrigins = [
    'http://localhost:3000',
    'https://www.postman.com',
    'https://web.postman.co',
    'https://cian-client-app.vercel.app'
];
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
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