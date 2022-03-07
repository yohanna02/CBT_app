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
  AdminStateTypes,
  AdminActionsTypes,
  AdminMutationsTypes,
  AdminGettersTypes,
} from "./adminInterface";

import { IRootState } from "./interface";

export const state: AdminStateTypes = {
  auth: false,
};

// store/modules/counter/action-types.ts
export enum ActionTypes {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}

// store/modules/counter/mutation-types.ts
export enum MutationTypes {
  SET_AUTH = "SET_AUTH",
}

export const getters: GetterTree<AdminStateTypes, IRootState> &
  AdminGettersTypes = {
  isLoggedIn: (state: AdminStateTypes) => {
    return state.auth;
  },
};

export const mutations: MutationTree<AdminStateTypes> & AdminMutationsTypes =
  {
    [MutationTypes.SET_AUTH](state: AdminStateTypes, payload: boolean) {
      state.auth = payload;
    },
  };

export const actions: ActionTree<AdminStateTypes, IRootState> &
  AdminActionsTypes = {
  async [ActionTypes.LOG_IN]({ commit }, { email, password }) {
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", `Bearer ${data.token}`);
    commit(MutationTypes.SET_AUTH, true);
  },
  [ActionTypes.LOG_OUT]({ commit }) {
    localStorage.clear();
    commit(MutationTypes.SET_AUTH, false);
  },
};

export type AdminStoreModuleTypes<S = AdminStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof AdminMutationsTypes,
    P extends Parameters<AdminMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<AdminMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof AdminGettersTypes]: ReturnType<AdminGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof AdminActionsTypes>(
    key: K,
    payload?: Parameters<AdminActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AdminActionsTypes[K]>;
};

// Module
const admin: Module<AdminStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default admin;
