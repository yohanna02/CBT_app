import mongoose from "mongoose";

interface StudentResult {
    regNo: string;
    totalQuestion: number;
    score: number;
};

interface ClassResult {
    classId: mongoose.Schema.Types.ObjectId;
    results: StudentResult[];
    missedExam: string[];
};

const resultSchema = new mongoose.Schema<StudentResult>({
    regNo: {
        type: String,
        required: true
    },
    totalQuestion: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const classResult = new mongoose.Schema<ClassResult>({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "class"
    },
    results: [
        resultSchema
    ],
    missedExam: []
});

const classResultModel = mongoose.model<ClassResult>("examResult", classResult);

export default classResultModel;