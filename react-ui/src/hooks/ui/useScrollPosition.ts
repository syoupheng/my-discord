import { RefObject, useEffect, useState } from "react";

const useScrollPosition = (containerRef: RefObject<HTMLDivElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    if (containerRef) {
      const position = containerRef.current?.scrollTop;
      setScrollPosition(position ?? 0);
    }
  };

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollPosition;
};

export default useScrollPosition;
