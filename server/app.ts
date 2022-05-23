import path from "path";
import express from "express";
import mongoose from "mongoose";
import Agenda from "agenda";

import authApi from "./api/auth";
import adminApi from "./api/admin";
import examApi from "./api/exams";
import examJobs from "./jobs/examJob";

mongoose.Promise = global.Promise;

const mongoConnectionString = "mongodb://127.0.0.1/CBT";

mongoose.connect(mongoConnectionString)
.then(() => console.log('Connected to mongodb server successfully'))
.catch((err) => console.error(err));

export const agenda = new Agenda({ db: { address: mongoConnectionString } });
examJobs();
agenda.start();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use("/api/auth", authApi);
app.use("/api/admin", adminApi);
app.use("/api/exams", examApi);

app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});