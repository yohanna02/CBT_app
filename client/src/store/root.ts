export interface IRootState {
  root: boolean;
  version: string;
}

export interface CounterStateTypes {
  counter: number;
  rootDispatch?: boolean
}