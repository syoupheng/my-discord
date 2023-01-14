import { RefObject, useEffect } from "react";

const useIntersectionObserver = (callback: () => void, elementRef?: RefObject<HTMLDivElement> | null) => {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback();
    });

    if (elementRef?.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef?.current) observer.unobserve(elementRef.current);
    };
  }, [elementRef, callback]);
};

export default useIntersectionObserver;
