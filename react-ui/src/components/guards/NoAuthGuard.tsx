import { Navigate, Outlet } from "react-router-dom";
import useAuthUserCache from "../../hooks/auth/useAuthUserCache";
import PublicBackground from "../layouts/PublicBackground";

const NoAuthGuard = () => {
  const authUser = useAuthUserCache();

  return authUser ? (
    <Navigate to="/channels/@me" />
  ) : (
    <PublicBackground>
      <Outlet />
    </PublicBackground>
  );
};

export default NoAuthGuard;
