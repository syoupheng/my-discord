import RegisterForm from "@/components/RegisterPage/RegisterForm";
import useRegisterForm from "@/hooks/auth/useRegisterForm";

const RegisterPage = () => {
  const registerFormProps = useRegisterForm();

  return <RegisterForm {...registerFormProps} />;
};

export default RegisterPage;
