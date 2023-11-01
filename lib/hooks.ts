import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import type { Action, State } from "./state/store";
import { GlobalStateContext } from "./state/GlobalStateProvider";
import { getAlternateLanguagePath } from "./navigation";

export function useGlobalState(): {
  state: State;
  dispatch: React.Dispatch<Action>;
} {
  return useContext(GlobalStateContext);
}

export function useAlternateLanguageNavigation(): () => void {
  const path = usePathname();
  const router = useRouter();
  return () => router.push(getAlternateLanguagePath(path));
}
