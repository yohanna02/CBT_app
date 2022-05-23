import mongoose from "mongoose";

type QuestionType = "OBJECTIVE" | "FILL_IN_THE_BLANK"

export default interface Exam {
    classId: mongoose.ObjectId,
    examDate: {
        timeAndDate: Date,
        duration: string 
    },
    questions: [
        {
            type: QuestionType,
            question: string,
            options: [
                {
                    option: string,
                    answer: boolean
                },
                {
                    option: string,
                    answer: boolean
                },
                {
                    option: string,
                    answer: boolean
                },
                {
                    option: string,
                    answer: boolean
                }
            ]
        }    
    ]
}