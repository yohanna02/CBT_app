import path from "path";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import Agenda from "agenda";

import authApi from "./api/auth";
import adminApi from "./api/admin";
import examApi from "./api/exams";
import resultApi from "./api/examResults";
import examJobs from "./jobs/examJob";
import initWebSocket from "./socket";

mongoose.Promise = global.Promise;

const mongoConnectionString = "mongodb://127.0.0.1/CBT";

mongoose.connect(mongoConnectionString)
.then(() => console.log('Connected to mongodb server successfully'))
.catch((err) => console.error(err));

export const agenda = new Agenda({ db: { address: mongoConnectionString } });
examJobs();
agenda.start();

const app = express();
const server = http.createServer(app);

initWebSocket(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use("/api/auth", authApi);
app.use("/api/admin", adminApi);
app.use("/api/exams", examApi);
app.use("/api/result", resultApi);

app.get("*", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});