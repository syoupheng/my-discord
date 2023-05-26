import useRegisterForm from "../hooks/auth/useRegisterForm";
import RegisterForm from "../components/RegisterPage/RegisterForm";

const RegisterPage = () => {
  const registerFormProps = useRegisterForm();

  return <RegisterForm {...registerFormProps} />;
};

export default RegisterPage;
