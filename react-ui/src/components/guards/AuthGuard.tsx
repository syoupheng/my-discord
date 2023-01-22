import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import useAuthUserCache from "../../hooks/auth/useAuthUserCache";
import PrivateApp from "../PrivateApp";

const AuthGuard = () => {
  const { data: authUserData } = useAuthUser({ fetchPolicy: "cache-only" });
  return authUserData ? (
    <PrivateApp>
      <Outlet />
    </PrivateApp>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
