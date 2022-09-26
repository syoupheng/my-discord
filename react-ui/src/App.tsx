import { Outlet } from "react-router-dom";
import FormContainer from "./components/Form/FormContainer";
import PublicBackground from "./components/layouts/PublicBackground";
import Spinner from "./components/shared/Spinner";
import useAuthUser from "./hooks/auth/useAuthUser";

const App = () => {

  const { loading } = useAuthUser();

  if (loading) {
    return (
      <PublicBackground>
        <FormContainer animate={false}>
          <Spinner size="lg" white />
        </FormContainer>
      </PublicBackground>
    );
  }

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default App;
