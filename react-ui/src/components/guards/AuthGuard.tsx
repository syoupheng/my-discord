import { Navigate, Outlet } from "react-router-dom";
import useAuthUserCache from "../../hooks/auth/useAuthUserCache";

const AuthGuard = () => {
  const authUser = useAuthUserCache();

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
