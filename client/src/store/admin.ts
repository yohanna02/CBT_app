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
  ListData,
} from "./adminInterface";

import { IRootState } from "./interface";

export const state: AdminStateTypes = {
  auth: false,
  students: [],
  classes: []
};

// store/modules/counter/action-types.ts
export enum ActionTypes {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
  ADD_ADMIN = "ADD_ADMIN",
  ADD_CLASS = "ADD_CLASS",
  FETCH_CLASS_LIST = "FETCH_CLASS_LIST",
  DELETE_CLASS = "DLELETE_CLASS",
  ADD_STUDENT = "ADD_STUDENT"
};

// store/modules/counter/mutation-types.ts
export enum MutationTypes {
  SET_AUTH = "SET_AUTH",
  SET_STUDENT = "SET_STUDENT",
  SET_CLASS = "SET_CLASS"
};

export const getters: GetterTree<AdminStateTypes, IRootState> &
  AdminGettersTypes = {
  isLoggedIn: (state: AdminStateTypes) => {
    return state.auth;
  },
  getStudent: (state: AdminStateTypes) => {
    return state.students;
  },
  getClasses: (state: AdminStateTypes) => {
    return state.classes;
  }
};

export const mutations: MutationTree<AdminStateTypes> & AdminMutationsTypes = {
  [MutationTypes.SET_AUTH](state: AdminStateTypes, payload: boolean) {
    state.auth = payload;
  },
  [MutationTypes.SET_STUDENT](state: AdminStateTypes, payload: ListData[]) {
    state.students = payload;
  },
  [MutationTypes.SET_CLASS](state: AdminStateTypes, payload: ListData[]) {
    state.classes = payload;
  }
};

export const actions: ActionTree<AdminStateTypes, IRootState> &
  AdminActionsTypes = {
  async [ActionTypes.LOG_IN]({ commit }, { email, password }) {
    const { data } = await axios.post<{ token: string }>("/api/auth/login", {
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
  async [ActionTypes.ADD_ADMIN](context, { email, password }) {
    const { data } = await axios.post<{ msg: string }>(
      "/api/auth/register",
      {
        email,
        password,
      },
      {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      }
    );

    alert(data.msg);
  },
  async [ActionTypes.ADD_CLASS]({dispatch}, { name }) {
    const { data } = await axios.post<{ msg: string }>(
      "/api/admin/class",
      {
        className: name,
      },
      {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      }
    );
    
    dispatch(ActionTypes.FETCH_CLASS_LIST);
    alert(data.msg);
  },
  async [ActionTypes.FETCH_CLASS_LIST]({commit}) {
    const { data } = await axios.get<ListData[]>("/api/admin/class");

    commit(MutationTypes.SET_CLASS, data);
  },
  async [ActionTypes.DELETE_CLASS]({commit, dispatch}, {id}) {
    const {data} = await axios.delete<{msg: string}>(`/api/admin/class/${id}`, {
      headers: {
        authorization: localStorage.getItem("token") || "",
      }
    });

    dispatch(ActionTypes.FETCH_CLASS_LIST);
    alert(data.msg);
  },
  async [ActionTypes.ADD_STUDENT](context, data) {
    const res = await axios.post<{msg: string}>("/api/admin/student", data, {
      headers: {
        authorization: localStorage.getItem("token") || "",
      }
    });

    alert(res.data.msg);
  }
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
