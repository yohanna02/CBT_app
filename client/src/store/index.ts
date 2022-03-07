import { createStore, Module, ModuleTree, useStore as VuexStore } from "vuex";
import { IRootState } from "./interface";
import adminModule, {AdminStoreModuleTypes} from "./admin";

// Modules
const modules: ModuleTree<IRootState> = {
  adminModule,
};

const root: Module<IRootState, IRootState> = {
  modules
};

export const store = createStore<IRootState>(root);

type StoreModules = {
  counter: AdminStoreModuleTypes;
};

export type Store = AdminStoreModuleTypes<Pick<StoreModules, "counter">>

export const useStore = ():Store => {
  return VuexStore() as Store;
}
