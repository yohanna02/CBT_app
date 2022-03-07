import express from "express";
import mongoose from "mongoose";

import authApi from "./api/auth";

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/CBT')
.then(() => console.log('Connected to mongodb server successfully'))
.catch((err) => console.error(err));

const app = express();

app.use(express.json());
app.use("/api/auth", authApi);

const port = 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});