import { useEffect, useRef } from "react";
import { UserStatus } from "@/gql/graphql";
import useEditProfile from "@/hooks/user/useEditProfile";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";

const IDLE_TIME = 300_000;

const useInactiveUser = () => {
  const authUser = useAuthUserInfo();
  const [changeUserStatus, { loading }] = useEditProfile();
  const previousStatusRef = useRef<UserStatus | null>(null);
  useEffect(() => {
    const { status } = authUser;

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
  }, [authUser, loading]);
};

export default useInactiveUser;
