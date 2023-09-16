import mongoose from "mongoose";
import { Request, Response } from "express";

import Exam from "../interfaces/ExamInterface";
import { getStudentExamsJob, scheduleExams, scheduleStudentExamStopTime } from "../jobs/examJob";
import examModel from "../model/examModel";
import classModel from "../model/adminModels";
import classResultModel from "../model/resultModel";

export const setExams = async (req: Request, res: Response) => {
    try {
        const exam = req.body as Exam;
        const classExist = await classModel.findOne({ _id: exam.classId });

        if (!classExist) {
            res.json({ status: "Error", msg: "Error! Class does'nt exist" });
            return;
        }

        const newExams = new examModel({
            exam
        });

        const saved = await newExams.save();

        await scheduleExams(exam.examDate.timeAndDate, exam.examDate.duration, saved._id);
        res.json({ status: "OK", msg: "Set Exams successfully" });
    } catch (error) {
        res.json({ status: "Error", msg: "An error occured" });
    }
}

export const startExams = async (req: Request, res: Response) => {
    try {
        const { regNo, classId } = req.body as { regNo: string, classId: string };

        const classExist = await classModel.findOne({ _id: classId });
        if (!classExist)
            return res.status(401).json({ status: "Not authorize", msg: "Class does'nt exist" });

        const studentExist = classExist.students.filter(student => student.regNo === regNo);
        if (studentExist.length === 0)
            return res.status(401).json({ status: "Not authorize", msg: "Reg No not registered in this class" });


        const exams = await examModel.findOne({ "exam.classId": classId });

        if (!exams?.examStart)
            return res.status(401).json({ status: "Not authorize", msg: "Exams have not started or has ended?" })

        const studentStartedExam = exams.students.find((student => student.regNo === regNo));
        let examEndTime: Date | undefined = studentStartedExam?.examEndTime;
        if (!studentStartedExam) {
            examEndTime = await scheduleStudentExamStopTime(exams._id, regNo, exams.exam.examDate.duration);
            exams.students.push({ regNo, examTimeOver: false, examEndTime });
            await exams.save();
        }

        if (studentStartedExam?.examTimeOver)
            return res.status(401).json({ status: "Not authorize", msg: "Exam already taken :)" });

        res.json({ _id: exams._id, exams: exams.exam, examEndTime });
    } catch (error) {
        res.status(500).json({ status: "Error", msg: "An error occured" });
    }
}

type studentAnswer = "option_1" | "option_2" | "option_3" | "option_4";

interface SubmitExams {
    examId: mongoose.Types.ObjectId;
    studentRegNo: string;
    studentAnswers: studentAnswer[];
    autoSubmit: boolean;
}

export const submitExams = async (req: Request<any,any,SubmitExams>, res: Response) => {
    try {
        const {examId, studentRegNo, studentAnswers, autoSubmit} = req.body;
        const exams = await examModel.findById(examId);

        if (!exams) 
            return res.status(422).json({ status: "Error", msg: "Exams does't exist" });

        const studentStartedExamsIndex = exams.students.findIndex(student => student.regNo === studentRegNo);

        if (exams.students[studentStartedExamsIndex].examTimeOver) {
            return res.status(403).json({status: "Error", msg: `${studentRegNo} have already submitted`});
        }

        if (!autoSubmit) {
            const studentJobs = await getStudentExamsJob(examId, studentRegNo);

            const job = studentJobs.find(studentJob => studentJob.attrs.data?.regNo === studentRegNo);     
            
            if (job) job.remove();
        }

        if (studentStartedExamsIndex !== -1) {
            exams.students[studentStartedExamsIndex].examTimeOver = true;
            exams.students[studentStartedExamsIndex].examEndTime = new Date();
            await exams.save();
        }

        const questionLength = exams.exam.questions.length;

        let scores = 0;

        for (let i = 0; i < questionLength; i++) {
            const optionLength = exams.exam.questions[i].options.length;

            for (let j = 0; j < optionLength; j++) {
                const studentAnswer = parseInt(studentAnswers[i].split("_")[1]) - 1;
                if (studentAnswer === j && exams.exam.questions[i].options[j].answer) {
                    scores++;
                    break;
                }
            }
        }
        
        const isResult = await classResultModel.findOne({ classId: exams.exam.classId });

        if (!isResult) {
            const newResult = new classResultModel({
                classId: exams.exam.classId,
                results: [
                    {
                        regNo: studentRegNo,
                        totalQuestion: questionLength,
                        score: scores
                    }
                ],
                missedExam: []
            });

            await newResult.save();
        } else {
            isResult.results.push({
                regNo: studentRegNo,
                totalQuestion: questionLength,
                score: scores
            })

            await isResult.save();
        }

        res.json({status: "done", scores, totalQuestion: questionLength});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "An error occured" });
    }
}