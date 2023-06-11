import { GET_AUTH_USER } from "@/hooks/auth/useAuthUser";
import useWindowFocus from "@/hooks/ui/useWindowFocus";
import { useApolloClient } from "@apollo/client";
import { useEffect, useRef } from "react";

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
