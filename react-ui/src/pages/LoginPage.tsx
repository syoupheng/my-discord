import LoginForm from "@/components/LoginPage/LoginForm";
import useLoginForm from "@/hooks/auth/useLoginForm";

const LoginPage = () => {
  const loginFormProps = useLoginForm();

  return <LoginForm {...loginFormProps} />;
};

export default LoginPage;
