import mongoose from "mongoose";
import { Job } from "agenda";
import { agenda } from "../app";
import classModel from "../model/adminModels";
import examModel from "../model/examModel";
import { examsStartNotificaion } from "../socket";
import classResultModel from "../model/resultModel";

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

export const getStudentExamsJob = async (examsId: mongoose.Types.ObjectId, regNo: string) => {
    const job = await agenda.jobs(
        { name: "stop-student-exams" },
        { data: -1 }
    );

    return job;
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
        const deletedExams = await examModel.findOneAndDelete({ _id: job.attrs.data?.examsID });
        await job.remove();

        if (deletedExams) {
            const classResults = await classResultModel.findOne({classId: deletedExams.exam.classId});
            const classStudents = await classModel.findById(deletedExams.exam.classId);

            if (classStudents && classResults) {
                setTimeout(() => {
                    const absentstudents = classStudents.students.filter(student => {
                        return deletedExams.students.filter(studentA => {
                            return student.regNo === studentA.regNo
                        }).length === 0;
                    });

                    const missedExamStudent = absentstudents.map(student => {
                        return student.regNo
                    });

                    console.log(absentstudents);

                    classResults.missedExam = [ ...missedExamStudent ];
                    classResults.save();
                }, 10000);
            }
        }
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
