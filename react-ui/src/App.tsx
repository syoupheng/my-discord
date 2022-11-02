import { Outlet } from "react-router-dom";
import LoadingScreen from "./components/shared/LoadingScreen";
import useAuthUser from "./hooks/auth/useAuthUser";

const App = () => {
  const { loading } = useAuthUser();

  if (loading) return <LoadingScreen />;

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
