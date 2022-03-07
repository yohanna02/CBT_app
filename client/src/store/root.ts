import { ActionContext } from "vuex";
import { MutationTypes as CounterMTypes } from "./admin";
import { ActionTypes as CounterATypes } from "./admin";

export interface IRootState {
  root: boolean;
  version: string;
}

export interface CounterStateTypes {
  counter: number;
  rootDispatch?: boolean
}

export interface CounterGettersTypes {
  doubledCounter(state: CounterStateTypes): number;
  counterValue(state: CounterStateTypes): number;
}

export type CounterMutationsTypes<S = CounterStateTypes> = {
  [CounterMTypes.SET_COUNTER](state: S, payload: number): void;
  [CounterMTypes.RESET_COUNTER](state: S): void;
  [CounterMTypes.ADD_COUNTER](state: S, payload: number): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof CounterMutationsTypes>(
    key: K,
    payload: Parameters<CounterMutationsTypes[K]>[1]
  ): ReturnType<CounterMutationsTypes[K]>;
} & Omit<ActionContext<CounterStateTypes, IRootState>, "commit">;

export interface CounterActionsTypes {
  [CounterATypes.GET_COUNTER](
    { commit }: AugmentedActionContext,
    payload: number
  ): void;
}