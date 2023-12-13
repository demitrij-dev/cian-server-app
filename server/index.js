const express = require("express")
const {json} = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()
const AuthRouter = require("./src/Auth/AuthRouter")
const DataRouter = require("./src/Data/DataRouter")
const mongoose = require("mongoose")
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DATABASE } = process.env;

const PORT = MONGODB_PORT
const URL = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@ciandb.slhlhib.mongodb.net`;

const app = express()

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://www.postman.com',
        'https://web.postman.co',
        'https://cian-client-app.vercel.app'
    ],
    credentials: true,
}));
app.use(json())
app.use("/server", AuthRouter)
app.use("/data", DataRouter)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

const start = async () => {
    try {
        await mongoose.connect(URL);
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    } catch (e) {
        console.error('Error starting the server:', e.message);
    }
};
start().then()