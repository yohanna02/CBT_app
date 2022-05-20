type QuestionType = "OBJECTIVE" | "FILL_IN_THE_BLANK"

export default interface Exam {
    classId: string,
    examDate: {
        timeAndDate: Date,
        duration: number 
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