import { createStore, Module, ModuleTree, useStore as VuexStore } from "vuex";
import { IRootState } from "./interface";
import adminModule, {AdminStoreModuleTypes} from "./admin";
import examModule, {ExamStoreModuleTypes} from "./exam";

// Modules
const modules: ModuleTree<IRootState> = {
  adminModule,
  examModule
};

const root: Module<IRootState, IRootState> = {
  modules
};

export const store = createStore<IRootState>(root);

type StoreModules = {
  counter: AdminStoreModuleTypes;
  exam: ExamStoreModuleTypes;
};

export type Store = AdminStoreModuleTypes<Pick<StoreModules, "counter">>
export type StoreExam = ExamStoreModuleTypes<Pick<StoreModules, "exam">>

export const useStore = ():Store => {
  return VuexStore() as Store;
}

export const useStoreExam = ():StoreExam => {
  return VuexStore() as StoreExam;
}
