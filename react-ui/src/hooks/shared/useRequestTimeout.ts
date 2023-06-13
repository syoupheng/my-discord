import { useEffect, useRef } from "react";

type Params = {
  isLoading: boolean;
  onTimeout: (...args: any[]) => any;
  timeout?: number
}

const DEFAULT_TIMEOUT = 20000;

const useRequestTimeout = ({ isLoading, onTimeout, timeout = DEFAULT_TIMEOUT }: Params) => {
  const currentTimeout = useRef<number>();
  useEffect(() => {
    if (isLoading) {
      currentTimeout.current = setTimeout(onTimeout, timeout)
    } else {
      clearTimeout(currentTimeout.current);
    }

    return () => {
      clearTimeout(currentTimeout.current);
    }
  }, [isLoading])
}
 
export default useRequestTimeout;