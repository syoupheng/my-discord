import { Navigate, Outlet, useParams } from "react-router-dom";
import useAuthUser from "../../hooks/auth/useAuthUser";
import { DEFAULT_ROUTE } from "../../main";

const PrivateGroupGuard = () => {
  const params = useParams();
  const { data } = useAuthUser();
  if (!data) return null;
  const { privateGroups } = data.me;
  return privateGroups.some((group) => group.id === parseInt(params.groupId!)) ? <Outlet /> : <Navigate to={DEFAULT_ROUTE} />;
};

export default PrivateGroupGuard;
