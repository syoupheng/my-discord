import { FaDiscord } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import FormContainer from "./components/Form/FormContainer";
import PublicBackground from "./components/layouts/PublicBackground";
import useAuthUser from "./hooks/auth/useAuthUser";

const App = () => {
  const { loading } = useAuthUser();

  if (loading) {
    return (
      <PublicBackground>
        <FormContainer>
          <FaDiscord size={80} className="text-white mx-auto animate-alt-spin" />
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
