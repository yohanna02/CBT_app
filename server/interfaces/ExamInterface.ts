import { Types } from "mongoose";

type QuestionType = "OBJECTIVE" | "FILL_IN_THE_BLANK";

interface Question {
    type: QuestionType;
    question: string;
    options: [
        {
            option: string;
            answer: boolean;
        },
        {
            option: string;
            answer: boolean;
        },
        {
            option: string;
            answer: boolean;
        },
        {
            option: string;
            answer: boolean;
        }
    ]
}
export default interface Exam {
    classId: Types.ObjectId | string;
    examDate: {
        timeAndDate: Date;
        duration: string ;
    }
    questions: Question[];
}