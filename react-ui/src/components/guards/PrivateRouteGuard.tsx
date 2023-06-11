import PrivateApp from "@/components/PrivateApp";
import LoadingScreen from "@/components/shared/LoadingScreen";
import useAuthUser from "@/hooks/auth/useAuthUser";
import useIsAuth from "@/hooks/auth/useIsAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteGuard = () => {
  const { data, loading } = useAuthUser();
  useIsAuth();
  if (loading) return <LoadingScreen />;
  return data ? (
    <PrivateApp>
      <Outlet />
    </PrivateApp>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRouteGuard;
