import axios from "axios";
import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module,
    ActionTree,
    MutationTree,
    GetterTree,
} from "vuex";
import {
    ExamStateTypes,
    ExamActionsTypes,
    ExamMutationsTypes,
    ExamGettersTypes,
    optionType
} from "./examInterface";

import { IRootState } from "./interface";

export const state: ExamStateTypes = {
    questionIndex: 0,
    examId: "",
    studentRegNo: "",
    autoSubmit: false,
    examEndTime: new Date(),
    studentAnswers: [],
    exam: {
        classId: "",
        examDate: {
            timeAndDate: new Date(),
            duration: ""
        },
        questions: [
            {
                type: "OBJECTIVE",
                question: "",
                options: [
                    {
                        option: "",
                        answer: false
                    },
                    {
                        option: "",
                        answer: false
                    },
                    {
                        option: "",
                        answer: false
                    },
                    {
                        option: "",
                        answer: false
                    }
                ]
            }
        ]
    },
    startExams: false,
    result:{
        score: 0,
        totalQuestion: 0
    }
};

// store/modules/counter/action-types.ts
export enum ActionTypes {
    SET_EXAMS = "SET_EXAMS",
    START_EXAMS = "START_EXAMS",
    SUBMIT_EXAMS = "SUBMIT_EXAMS"
};

// store/modules/counter/mutation-types.ts
export enum MutationTypes {
    ADD_QUESTION = "ADD_QUESTION",
    SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION",
    UPDATE_ANSWER = "UPDATE_ANSWER",
    SET_CLASS_ID = "SET_CLASS_ID",
    RESET_QUESTIONS = "RESET_QUESTIONS",
    SET_EXAM_STATUS = "SET_EXAM_STATUS",
    UPDATE_PICKED_ANSWER = "UPDATE_PICKED_ANSWER",
    CHANGE_AUTO_SUBMIT = "CHANGE_AUTO_SUBMIT",
    SET_RESULT = "SET_RESULT"
};

export const getters: GetterTree<ExamStateTypes, IRootState> &
    ExamGettersTypes = {
    getExamQuestions: (state) => {
        return state.exam.questions;
    },
    getCurrentQuestion: (state) => {
        return state.questionIndex;
    },
    getDateAndTime: (state) => {
        return state.exam.examDate;
    },
    getClassId: (state) => {
        return state.exam.classId;
    },
    getExams: (state) => {
        return state.exam;
    },
    getExamStatus: (state) => {
        return state.startExams;
    },
    getExamEndTime: (state) => {
        return state.examEndTime;
    },
    getStudentAnswer: (state) => {
        return state.studentAnswers;
    },
    getResults: (state) => {
        return state.result;
    }
};

export const mutations: MutationTree<ExamStateTypes> & ExamMutationsTypes = {
    [MutationTypes.ADD_QUESTION](state) {
        const newLength = state.exam.questions.push({
            type: "OBJECTIVE",
            question: "",
            options: [
                {
                    option: "",
                    answer: false
                },
                {
                    option: "",
                    answer: false
                },
                {
                    option: "",
                    answer: false
                },
                {
                    option: "",
                    answer: false
                }
            ]
        });

        state.questionIndex = newLength - 1;
    },
    [MutationTypes.SET_CURRENT_QUESTION](state, payload) {
        state.questionIndex = payload;
    },
    [MutationTypes.UPDATE_ANSWER](state, payload) {
        if (payload === "option_1") {
            state.exam.questions[state.questionIndex].options[0].answer = true;
            state.exam.questions[state.questionIndex].options[1].answer = false;
            state.exam.questions[state.questionIndex].options[2].answer = false;
            state.exam.questions[state.questionIndex].options[3].answer = false;
        } else if (payload === "option_2") {
            state.exam.questions[state.questionIndex].options[0].answer = false;
            state.exam.questions[state.questionIndex].options[1].answer = true;
            state.exam.questions[state.questionIndex].options[2].answer = false;
            state.exam.questions[state.questionIndex].options[3].answer = false;
        } else if (payload === "option_3") {
            state.exam.questions[state.questionIndex].options[0].answer = false;
            state.exam.questions[state.questionIndex].options[1].answer = false;
            state.exam.questions[state.questionIndex].options[2].answer = true;
            state.exam.questions[state.questionIndex].options[3].answer = false;
        } else if (payload === "option_4") {
            state.exam.questions[state.questionIndex].options[0].answer = false;
            state.exam.questions[state.questionIndex].options[1].answer = false;
            state.exam.questions[state.questionIndex].options[2].answer = false;
            state.exam.questions[state.questionIndex].options[3].answer = true;
        }
    },
    [MutationTypes.SET_CLASS_ID](state, payload) {
        state.exam.classId = payload;
    },
    [MutationTypes.RESET_QUESTIONS](state) {
        // console.log("ss");
        state.exam = {
            classId: "",
            examDate: {
                timeAndDate: new Date(),
                duration: ""
            },
            questions: [
                {
                    type: "OBJECTIVE",
                    question: "",
                    options: [
                        {
                            option: "",
                            answer: false
                        },
                        {
                            option: "",
                            answer: false
                        },
                        {
                            option: "",
                            answer: false
                        },
                        {
                            option: "",
                            answer: false
                        }
                    ]
                }
            ]
        }
        state.questionIndex = 0;
    },
    [MutationTypes.SET_EXAM_STATUS](state, payload) {
        state.startExams = payload;
    },
    [MutationTypes.UPDATE_PICKED_ANSWER](state, payload){

        state.studentAnswers[state.questionIndex] = payload;
    },
    [MutationTypes.CHANGE_AUTO_SUBMIT](state, payload) {
        state.autoSubmit = payload;
    },
    [MutationTypes.SET_RESULT](state, payload) {
        state.result = { ...payload };
    }
};

export const actions: ActionTree<ExamStateTypes, IRootState> &
    ExamActionsTypes = {
    async [ActionTypes.SET_EXAMS]({ commit, state }) {
        const { data } = await axios.post<{ msg: string }>(
            "/api/exams/set-exams",
            state.exam,
            {
                headers: {
                    authorization: localStorage.getItem("token") || "",
                },
            }
        );

        alert(data.msg);
        commit(MutationTypes.RESET_QUESTIONS, undefined);
        state.exam
    },
    async [ActionTypes.START_EXAMS]({ commit, state }, { regNo, classId }) {
        const { data } = await axios.post("/api/exams/start-exams", {
            regNo,
            classId
        });

        console.log(data);
        commit(MutationTypes.SET_EXAM_STATUS, true);
        state.exam = data.exams;
        state.examId = data._id;
        state.examEndTime = new Date(data.examEndTime);
        state.studentRegNo = regNo;
    },
    async [ActionTypes.SUBMIT_EXAMS]({commit, state: { studentRegNo, examId, studentAnswers, autoSubmit }}) {
        const { data } = await axios.post<{status: string, scores: number, totalQuestion: number}>("/api/exams/submit-exams", {
            examId,
            studentRegNo,
            studentAnswers,
            autoSubmit
        });

        console.log(data);

        commit(MutationTypes.SET_RESULT, {
            score: data.scores,
            totalQuestion: data.totalQuestion
        });

        commit(MutationTypes.SET_EXAM_STATUS, false);
    }
};

export type ExamStoreModuleTypes<S = ExamStateTypes> = Omit<
    VuexStore<S>,
    "commit" | "getters" | "dispatch"
> & {
    commit<
        K extends keyof ExamMutationsTypes,
        P extends Parameters<ExamMutationsTypes[K]>[1]
    >(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<ExamMutationsTypes[K]>;
} & {
    getters: {
        [K in keyof ExamGettersTypes]: ReturnType<ExamGettersTypes[K]>;
    };
} & {
    dispatch<K extends keyof ExamActionsTypes>(
        key: K,
        payload?: Parameters<ExamActionsTypes[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ExamActionsTypes[K]>;
};

// Module
const exam: Module<ExamStateTypes, IRootState> = {
    state,
    getters,
    mutations,
    actions,
};

export default exam;
