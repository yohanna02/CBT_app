import { ActionContext } from "vuex";
import { MutationTypes as AdminMTypes } from "./admin";
import { ActionTypes as AdminATypes } from "./admin";
import { IRootState } from "./interface";

export interface AdminStateTypes {
  auth: boolean;
  rootDispatch?: boolean;
}

export interface AdminGettersTypes {
  isLoggedIn(state: AdminStateTypes): boolean;
}

export type AdminMutationsTypes<S = AdminStateTypes> = {
  [AdminMTypes.SET_AUTH](state: S, payload: boolean): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof AdminMutationsTypes>(
    key: K,
    payload: Parameters<AdminMutationsTypes[K]>[1]
  ): ReturnType<AdminMutationsTypes[K]>;
} & Omit<ActionContext<AdminStateTypes, IRootState>, "commit">;

interface LoginData {
  email: string;
  password: string;
}

export interface AdminActionsTypes {
  [AdminATypes.LOG_IN]({ commit }: AugmentedActionContext, payload: LoginData): void;
  [AdminATypes.LOG_OUT]({commit}: AugmentedActionContext): void;
  [AdminATypes.ADD_ADMIN]({ commit }: AugmentedActionContext, payload: LoginData): void;
}
