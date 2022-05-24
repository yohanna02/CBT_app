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
    }
};

// store/modules/counter/action-types.ts
export enum ActionTypes {
    SET_EXAMS = "SET_EXAMS"
};

// store/modules/counter/mutation-types.ts
export enum MutationTypes {
    ADD_QUESTION = "ADD_QUESTION",
    SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION",
    UPDATE_ANSWER = "UPDATE_ANSWER",
    SET_CLASS_ID = "SET_CLASS_ID",
    RESET_QUESTIONS = "RESET_QUESTIONS"
};

export const getters: GetterTree<ExamStateTypes, IRootState> &
    ExamGettersTypes = {
    getExamQuestions: (state: ExamStateTypes) => {
        return state.exam.questions;
    },
    getCurrentQuestion: (state: ExamStateTypes) => {
        return state.questionIndex;
    },
    getDateAndTime: (state: ExamStateTypes) => {
        return state.exam.examDate;
    },
    getClassId: (state: ExamStateTypes) => {
        return state.exam.classId;
    },
    getExams: (state: ExamStateTypes) => {
        return state.exam;
    }
};

export const mutations: MutationTree<ExamStateTypes> & ExamMutationsTypes = {
    [MutationTypes.ADD_QUESTION](state: ExamStateTypes) {
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
    [MutationTypes.SET_CURRENT_QUESTION](state: ExamStateTypes, payload: number) {
        state.questionIndex = payload;
    },
    [MutationTypes.UPDATE_ANSWER](state: ExamStateTypes, payload: optionType) {
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
    [MutationTypes.SET_CLASS_ID](state: ExamStateTypes, payload: ExamStateTypes["exam"]["classId"]) {
        state.exam.classId = payload;
    },
    [MutationTypes.RESET_QUESTIONS](state: ExamStateTypes) {
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
    }
};

export const actions: ActionTree<ExamStateTypes, IRootState> &
    ExamActionsTypes = {
    async [ActionTypes.SET_EXAMS]({ commit, state }) {
        const { data } = await axios.post<{msg: string}>(
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
