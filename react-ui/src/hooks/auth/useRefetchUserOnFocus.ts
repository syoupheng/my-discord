import { useApolloClient } from "@apollo/client";
import { useEffect, useRef } from "react";
import useWindowFocus from "../ui/useWindowFocus";
import { GET_AUTH_USER } from "./useAuthUser";

const STALE_TIME = 30000;

const useRefetchUserOnFocus = () => {
  const isStale = useRef(false);
  const client = useApolloClient();
  const refetchOnFocus = () => {
    if (isStale.current) {
      client.refetchQueries({ include: [GET_AUTH_USER] });
      isStale.current = false;
      setTimeout(() => {
        isStale.current = true;
      }, STALE_TIME);
    }
  };

  useEffect(() => {
    const refetchTimeOut = setTimeout(() => {
      isStale.current = true;
    }, STALE_TIME);

    return () => clearTimeout(refetchTimeOut);
  }, []);

  useWindowFocus(refetchOnFocus);
};

export default useRefetchUserOnFocus;
