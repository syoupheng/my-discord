import useLoginForm from "../hooks/auth/useLoginForm";
import LoginForm from "../components/LoginPage/LoginForm";

const LoginPage = () => {
  const loginFormProps = useLoginForm();

  return <LoginForm {...loginFormProps} />;
};

export default LoginPage;
