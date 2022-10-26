import { Navigate, Outlet } from "react-router-dom";
import useAuthUserCache from "../../hooks/auth/useAuthUserCache";
import PrivateApp from "../PrivateApp";

const AuthGuard = () => {
  const authUser = useAuthUserCache();

  return authUser ? (
    <PrivateApp>
      <Outlet />
    </PrivateApp>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthGuard;
