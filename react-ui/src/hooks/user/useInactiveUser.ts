import { useEffect, useRef } from "react";
import { UserStatus } from "../../gql/graphql";
import useAuthUser from "../auth/useAuthUser";
import useEditProfile from "./useEditProfile";

const IDLE_TIME = 300_000;

const useInactiveUser = () => {
  const { data } = useAuthUser();
  const [changeUserStatus, { loading }] = useEditProfile();
  const previousStatusRef = useRef<UserStatus | null>(null);
  useEffect(() => {
    if (!data) return;
    const { status } = data.me;

    const onUserIdle = () => {
      if (!["INACTIVE", "INVISIBLE"].includes(status)) {
        previousStatusRef.current = status;
        changeUserStatus({ variables: { input: { status: "INACTIVE" } } });
      }
    };

    let timeout = setTimeout(onUserIdle, IDLE_TIME);

    const onUserActive = () => {
      clearTimeout(timeout);
      timeout = setTimeout(onUserIdle, IDLE_TIME);
      if (status === "INACTIVE" && previousStatusRef.current && !["INACTIVE", "INVISIBLE"].includes(previousStatusRef.current)) {
        if (!loading) changeUserStatus({ variables: { input: { status: previousStatusRef.current } } });
      }
    };

    document.addEventListener("mousemove", onUserActive);
    document.addEventListener("keypress", onUserActive);
    document.addEventListener("click", onUserActive);
    window.addEventListener("focus", onUserActive);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", onUserActive);
      document.removeEventListener("keypress", onUserActive);
      document.removeEventListener("click", onUserActive);
      window.removeEventListener("focus", onUserActive);
    };
  }, [data, loading]);
};

export default useInactiveUser;
