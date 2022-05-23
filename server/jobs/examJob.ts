import { Job } from "agenda";
import mongoose from "mongoose";
import { agenda } from "../app";
import examModel from "../model/examModel";

export const scheduleExams = async (examsDate: Date, examDuration: string, examsID: mongoose.Types.ObjectId) => {
    await agenda.schedule(examsDate, "start-exam", { examsDate, examsID, examDuration });
};

const stopExams = async (examsDate: Date, examDuration: string, examsID: mongoose.Types.ObjectId) => {
    const [duration, type] = examDuration.split("-");
    const examStopTime = new Date(examsDate);

    if (type === "m") {
        const minutes = examStopTime.getMinutes() + parseInt(duration);
        examStopTime.setMinutes(minutes);
    } else if (type === "h") {
        const hours = examStopTime.getHours() + parseInt(duration);
        examStopTime.setHours(hours);
    }

    await agenda.schedule(examStopTime, "stop-exam", { examsID });
}

const examJobs = () => {
    agenda.define("start-exam", async (job: Job) => {
        await examModel.findOneAndUpdate({ _id: job.attrs.data?.examsID }, { examStart: true });
        job.remove();
        stopExams(job.attrs.data?.examsDate, job.attrs.data?.examDuration, job.attrs.data?.examsID);
    });

    agenda.define("stop-exam", async (job: Job) => {
        await examModel.findOneAndUpdate({ _id: job.attrs.data?.examsID }, { examStart: false });
        job.remove();
    });
}

export default examJobs;
