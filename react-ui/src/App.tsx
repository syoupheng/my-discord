import { Outlet } from "react-router-dom";
import Spinner from "./components/shared/Spinner";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {

  const { data: authUser, loading, error } = useAuthUser();

  if (loading) return <Spinner size="lg" />;

  return (
    <div className="App">
      <p>{authUser?.username ?? 'Not logged in'}</p>
      <Outlet />
    </div>
  );
};

export default App;
