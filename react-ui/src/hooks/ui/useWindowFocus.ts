import { DependencyList, useEffect } from "react";

const useWindowFocus = (onFocus: (this: Window, evt: FocusEvent) => any, dependencies?: DependencyList) => {
  useEffect(() => {
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, dependencies ?? []);
};

export default useWindowFocus;
