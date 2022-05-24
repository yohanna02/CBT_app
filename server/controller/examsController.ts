import { Request, Response } from "express";

import Exam from "../interfaces/ExamInterface";
import { scheduleExams } from "../jobs/examJob";
import examModel from "../model/examModel";
import { classModel } from "../model/adminModels";

export const setExams = async (req: Request, res: Response) => {
    try {
        const exam = req.body as Exam;
        const classExist = await classModel.findOne({_id: exam.classId});

        if (!classExist) {
            res.json({status: "Error", msg: "Error! Class does'nt exist"});
            return;
        }

        const newExams = new examModel({
            exam
        });

        const saved = await newExams.save();
        
        await scheduleExams(exam.examDate.timeAndDate, exam.examDate.duration, saved._id);
        res.json({status: "OK", msg: "Set Exams successfully"});
    } catch (error) {
        res.json({status: "Error", msg: "An error occured"});
    }
}