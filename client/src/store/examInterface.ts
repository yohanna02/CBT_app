import { ActionContext } from "vuex";
import { MutationTypes as ExamMTypes } from "./exam";
import { ActionTypes as ExamATypes } from "./exam";
import { IRootState } from "./interface";
import ExamInterface from "../../../server/interfaces/ExamInterface";

export type optionType = "" | "option_1" | "option_2" | "option_3" | "option_4";

export interface ExamStateTypes {
  rootDispatch?: boolean;
  questionIndex: number;
  examId: string;
  studentRegNo: string;
  autoSubmit: boolean;
  examEndTime: Date;
  studentAnswers: string[];
  exam: ExamInterface;
  startExams: boolean;
  result: {
    score: number;
    totalQuestion: number;
  }
}

export interface ExamGettersTypes {
  getExamQuestions(state: ExamStateTypes):ExamStateTypes["exam"]["questions"];
  getCurrentQuestion(state: ExamStateTypes): ExamStateTypes["questionIndex"];
  getDateAndTime(state: ExamStateTypes): ExamStateTypes["exam"]["examDate"];
  getClassId(state: ExamStateTypes): ExamStateTypes["exam"]["classId"];
  getExams(state: ExamStateTypes): ExamStateTypes["exam"];
  getExamStatus(state: ExamStateTypes): ExamStateTypes["startExams"];
  getExamEndTime(state: ExamStateTypes): ExamStateTypes["examEndTime"];
  getStudentAnswer(state: ExamStateTypes): ExamStateTypes["studentAnswers"];
  getResults(state: ExamStateTypes): ExamStateTypes["result"];
}

export type ExamMutationsTypes<S = ExamStateTypes> = {
  [ExamMTypes.ADD_QUESTION](state: S): void;
  [ExamMTypes.SET_CURRENT_QUESTION](state: S, payload: number): void
  [ExamMTypes.UPDATE_ANSWER](state: S, payload: optionType): void;
  [ExamMTypes.SET_CLASS_ID](state: S, payload: ExamStateTypes["exam"]["classId"]): void;
  [ExamMTypes.RESET_QUESTIONS](state: S): void;
  [ExamMTypes.SET_EXAM_STATUS](state: S, payload: boolean): void;
  [ExamMTypes.UPDATE_PICKED_ANSWER](state: S, payload: string): void;
  [ExamMTypes.CHANGE_AUTO_SUBMIT](state: S, payload: boolean): void;
  [ExamMTypes.SET_RESULT](state: S, payload: ExamStateTypes["result"]): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof ExamMutationsTypes>(
    key: K,
    payload: Parameters<ExamMutationsTypes[K]>[1]
  ): ReturnType<ExamMutationsTypes[K]>;
} & Omit<ActionContext<ExamStateTypes, IRootState>, "commit">;

export interface StudentInfo {
  regNo: string;
  classId: string;
}

export interface ExamActionsTypes {
  [ExamATypes.SET_EXAMS]({commit, state}: AugmentedActionContext): void;
  [ExamATypes.START_EXAMS]({commit, state}: AugmentedActionContext, payload: StudentInfo): void;
  [ExamATypes.SUBMIT_EXAMS]({commit, state}: AugmentedActionContext): void;
}
