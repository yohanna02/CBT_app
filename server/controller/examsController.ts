import { Request, Response } from "express";

import Exam from "../interfaces/ExamInterface";
import { scheduleExams, scheduleStudentExamStopTime } from "../jobs/examJob";
import examModel from "../model/examModel";
import classModel from "../model/adminModels";

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