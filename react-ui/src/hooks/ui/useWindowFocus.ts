import { useEffect } from "react";

const useWindowFocus = (onFocus: (this: Window, evt: FocusEvent) => any) => {
  useEffect(() => {
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, []);
};

export default useWindowFocus;
