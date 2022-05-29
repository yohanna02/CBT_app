import mongoose from "mongoose";
import { Job } from "agenda";
import { agenda } from "../app";
import classModel from "../model/adminModels";
import examModel from "../model/examModel";
import { examsStartNotificaion } from "../socket";

export const scheduleExams = async (examsDate: Date, examDuration: string, examsID: mongoose.Types.ObjectId) => {
    await agenda.schedule(examsDate, "start-exam", { examsDate, examsID, examDuration });
};

const examStopDuration = (examDuration: string, examsDate: Date): Date => {
    const [duration, type] = examDuration.split("-");
    const examStopTime = new Date(examsDate);

    if (type === "m") {
        const minutes = examStopTime.getMinutes() + parseInt(duration);
        examStopTime.setMinutes(minutes);
    } else if (type === "h") {
        const hours = examStopTime.getHours() + parseInt(duration);
        examStopTime.setHours(hours);
    }

    return examStopTime;
}

const stopExams = async (examsDate: Date, examDuration: string, examsID: mongoose.Types.ObjectId) => {
    const examStopTime = examStopDuration(examDuration, examsDate);

    await agenda.schedule(examStopTime, "stop-exam", { examsID });
}

export const scheduleStudentExamStopTime = async (examsId: mongoose.Types.ObjectId, regNo: string, examDuration: string) => {
    const examStopTime = examStopDuration(examDuration, new Date());

    await agenda.schedule(examStopTime, "stop-student-exams", { examsId, regNo });

    return examStopTime;
}

const examJobs = () => {
    agenda.define("start-exam", async (job: Job) => {
        const exams = await examModel.findOneAndUpdate({ _id: job.attrs.data?.examsID }, { examStart: true });
        job.remove();
        stopExams(job.attrs.data?.examsDate, job.attrs.data?.examDuration, job.attrs.data?.examsID);
        const _class = await classModel.findOne({ _id: exams?.exam.classId });
        examsStartNotificaion(`${_class?.name} Exams have started`);
    });

    agenda.define("stop-exam", async (job: Job) => {
        await examModel.findOneAndUpdate({ _id: job.attrs.data?.examsID }, { examStart: false });
        job.remove();
    });

    agenda.define("stop-student-exams", async (job: Job) => {
        const exams = await examModel.findById(job.attrs.data?.examsId);
        if (exams) {
            const updatedExams = exams.students.map(student => {
                if (student.regNo === job.attrs.data?.regNo) {
                    student.examTimeOver = true;
                }
                return student;
            });

            exams.students = updatedExams;

            await exams.save();
            job.remove();
        }
    });
}

export default examJobs;
