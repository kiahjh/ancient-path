import { useContext } from "react";
import type React from "react";
import type { Action, State } from "./store";
import { GlobalStateContext } from "./GlobalStateProvider";

export function useGlobalState(): {
  state: State;
  dispatch: React.Dispatch<Action>;
} {
  return useContext(GlobalStateContext);
}
