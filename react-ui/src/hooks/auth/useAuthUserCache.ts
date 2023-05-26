import { useNavigate } from "react-router-dom";
import useAuthUser from "./useAuthUser";
import { useFragment } from "../../gql";
import { AUTH_USER_FRAGMENT } from "../../fragments/auth";

const useAuthUserCache = () => {
  const navigate = useNavigate();
  const { data } = useAuthUser({ fetchPolicy: "cache-only" });
  if (!data) navigate("/login");
  const authUser = useFragment(AUTH_USER_FRAGMENT, data.me);
  return authUser;
};

export default useAuthUserCache;
