import { ActionContext } from "vuex";
import { MutationTypes as AdminMTypes } from "./admin";
import { ActionTypes as AdminATypes } from "./admin";
import { IRootState } from "./interface";

interface LoginData {
  email: string;
  password: string;
};

export interface ListData {
  _id?: string;
  name: string;
};

export interface StudentData {
  _id?: string,
  regNo:  string,
  class_id: string
};

export interface AdminStateTypes {
  auth: boolean;
  students: ListData[];
  classes: ListData[];
  rootDispatch?: boolean;
}

export interface AdminGettersTypes {
  isLoggedIn(state: AdminStateTypes): boolean;
  getStudent(state: AdminStateTypes): ListData[];
  getClasses(state: AdminStateTypes): ListData[];
}

export type AdminMutationsTypes<S = AdminStateTypes> = {
  [AdminMTypes.SET_AUTH](state: S, payload: boolean): void;
  [AdminMTypes.SET_STUDENT](state: S, payload: ListData[]): void;
  [AdminMTypes.SET_CLASS](state: S, payload: ListData[]): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof AdminMutationsTypes>(
    key: K,
    payload: Parameters<AdminMutationsTypes[K]>[1]
  ): ReturnType<AdminMutationsTypes[K]>;
} & Omit<ActionContext<AdminStateTypes, IRootState>, "commit">;

export interface AdminActionsTypes {
  [AdminATypes.LOG_IN]({ commit }: AugmentedActionContext, payload: LoginData): void;
  [AdminATypes.LOG_OUT]({commit}: AugmentedActionContext): void;
  [AdminATypes.ADD_ADMIN]({ commit }: AugmentedActionContext, payload: LoginData): void;
  [AdminATypes.ADD_CLASS]({ dispatch }: AugmentedActionContext, payload: ListData): void;
  [AdminATypes.FETCH_CLASS_LIST]({ commit }: AugmentedActionContext): void;
  [AdminATypes.DELETE_CLASS]({ commit }: AugmentedActionContext, payload: {id: string}): void;
  [AdminATypes.ADD_STUDENT](context: AugmentedActionContext, payload: StudentData): void;
}
