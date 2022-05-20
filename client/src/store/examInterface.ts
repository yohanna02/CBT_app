import { ActionContext } from "vuex";
import { MutationTypes as ExamMTypes } from "./exam";
import { ActionTypes as ExamATypes } from "./exam";
import { IRootState } from "./interface";
import ExamInterface from "../../../global/ExamInterface";

export type optionType = "" | "option_1" | "option_2" | "option_3" | "option_4";

export interface ExamStateTypes {
  rootDispatch?: boolean;
  questionIndex: number;
  exam: ExamInterface;
}

export interface ExamGettersTypes {
  getExamQuestions(state: ExamStateTypes):ExamStateTypes["exam"]["questions"];
  getCurrentQuestion(state: ExamStateTypes): ExamStateTypes["questionIndex"];
  getDateAndTime(state: ExamStateTypes): ExamStateTypes["exam"]["examDate"];
  getClassId(state: ExamStateTypes): ExamStateTypes["exam"]["classId"];
  getExams(state: ExamStateTypes): ExamStateTypes["exam"];
}

export type ExamMutationsTypes<S = ExamStateTypes> = {
  [ExamMTypes.ADD_QUESTION](state: S):void;
  [ExamMTypes.SET_CURRENT_QUESTION](state: S, payload: number): void
  [ExamMTypes.UPDATE_ANSWER](state: S, payload: optionType): void;
  [ExamMTypes.SET_CLASS_ID](state: S, payload: ExamStateTypes["exam"]["classId"]): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof ExamMutationsTypes>(
    key: K,
    payload: Parameters<ExamMutationsTypes[K]>[1]
  ): ReturnType<ExamMutationsTypes[K]>;
} & Omit<ActionContext<ExamStateTypes, IRootState>, "commit">;

export interface ExamActionsTypes {
  
}
