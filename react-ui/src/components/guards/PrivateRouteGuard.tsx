import { Navigate, Outlet } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import PrivateApp from "../PrivateApp";
import useIsAuth from "../../hooks/auth/useIsAuth";
import LoadingScreen from "../shared/LoadingScreen";

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
