import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import PublicBackground from "../layouts/PublicBackground";
import LoadingScreen from "../shared/LoadingScreen";

const PublicRouteGuard = () => {
  const { data, loading } = useAuthUser({ fetchPolicy: "cache-only" });
  if (loading) return <LoadingScreen />;
  return data ? (
    <Navigate to="/channels/@me" />
  ) : (
    <PublicBackground>
      <Outlet />
    </PublicBackground>
  );
};

export default PublicRouteGuard;
