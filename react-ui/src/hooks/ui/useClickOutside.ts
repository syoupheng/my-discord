import { useEffect, useRef } from "react";

type Callback = (event: MouseEvent | TouchEvent) => void;

const useClickOutside = (callback: Callback) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) callback(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  });

  return ref;
};

export default useClickOutside;
