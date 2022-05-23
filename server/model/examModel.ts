import mongoose from "mongoose";

import ExamInterface from "../interfaces/ExamInterface";

interface Exam {
    exam: ExamInterface,
    examStart: false
}

const examSchema = new mongoose.Schema<Exam>({
    exam: {
        classId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        examDate: {
            timeAndDate: {
                type: mongoose.Schema.Types.Date,
                required: true
            },
            duration: {
                type: String,
                required: true
            }
        },
        questions: [
            {
                type: {
                    type: String,
                    required: true
                },
                question: {
                    type: String,
                    required: true
                },
                options: [
                    
                ]
            }
        ]
    },
    examStart: {
        type: Boolean,
        default: false
    }
});

const examModel = mongoose.model<Exam>("exam", examSchema);

export default examModel;