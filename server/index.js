const express = require("express")
const {json} = require("express")
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()
const AuthRouter = require("./src/Auth/AuthRouter")
const DataRouter = require("./src/Data/DataRouter")
const mongoose = require("mongoose")
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;

const PORT = process.env.PORT || 3030;
const URL = `mongodb+srv://${MONGODB_USER || "lox"}:${MONGODB_PASSWORD }@ciandb.slhlhib.mongodb.net`;

const app = express()

app.use(cors({
    origin: '*',
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