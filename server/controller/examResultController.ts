import { Request, Response } from "express";
import { ClassInterface } from "../interfaces/AdminInterface";
import classResultModel from "../model/resultModel";


export const getAllResults = async (req: Request, res: Response) => {
    try {
        const examResults = await classResultModel.find().populate<{ classId: ClassInterface }>("classId");

        const mappedExamResults = examResults.map(result => ({ _id: result._id, className: result.classId.name }))

        res.json(mappedExamResults);
    } catch (error) {
        // res.json(error);
        res.json({ status: "Error", msg: "An error occured" });
    }
}

export const getStudentsResultDetails = async (req: Request<{ resultId: string }>, res: Response) => {
    try {
        const { resultId } = req.params;
        const examResults = await classResultModel.findById(resultId).populate<{ classId: ClassInterface }>("classId");

        if (examResults) {
            const resultRegNo = examResults.results.map(result => result.regNo);
            res.json({
                className: examResults.classId.name,
                resultRegNo,
                missedExam: examResults.missedExam
            });
            return;
        }

        throw "Invalid result Id";

    } catch (error: any) {
        // res.json(error);
        res.json({ status: "Error", msg: error.message || "An error occured" });
    }
}

export const getSingleResult = async (req: Request<{ resultId: string }, any, any, {regNo: string}>, res: Response) => {
    try {
        const { resultId } = req.params;
        const { regNo } = req.query;
        const examResults = await classResultModel.findById(resultId);

        if (!examResults) return res.status(404).json({ status: "not-found", msg: "Invalid result Id" });

        const student = examResults.results.find(result => result.regNo === regNo);

        if (!student) return res.status(404).json({ status: "not-found", msg: "Invalid Registration number" });

        res.json(student);
    } catch (error: any) {
        // res.json(error);
        res.json({ status: "Error", msg: "An error occured" });
    }
}