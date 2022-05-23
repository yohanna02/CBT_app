import { Request, Response } from "express";

import Exam from "../interfaces/ExamInterface";
import { scheduleExams } from "../jobs/examJob";
import examModel from "../model/examModel";

export const setExams = async (req: Request, res: Response) => {
    try {
        const exam = req.body as Exam;

        const newExams = new examModel({
            exam
        });

        const saved = await newExams.save();
        console.log(saved.isNew);
        
        await scheduleExams(exam.examDate.timeAndDate, exam.examDate.duration, saved._id);
        res.json(exam);
    } catch (error) {
        res.json(error);
    }
}