import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import PublicBackground from "../layouts/PublicBackground";

const NoAuthGuard = () => {
  const { data: authUserData } = useAuthUser({ fetchPolicy: "cache-only" });

  return authUserData ? (
    <Navigate to="/channels/@me" />
  ) : (
    <PublicBackground>
      <Outlet />
    </PublicBackground>
  );
};

export default NoAuthGuard;
