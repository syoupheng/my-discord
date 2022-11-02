import { FaDiscord } from "react-icons/fa";
import FormContainer from "../Form/FormContainer";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <FormContainer shadow={false}>
        <FaDiscord size={80} className="text-white mx-auto animate-alt-spin" />
      </FormContainer>
    </div>
  );
};

export default LoadingScreen;
