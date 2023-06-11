import PublicBackground from "@/components/layouts/PublicBackground";
import LoadingScreen from "@/components/shared/LoadingScreen";
import useAuthUser from "@/hooks/auth/useAuthUser";
import { Navigate, Outlet } from "react-router-dom";

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
