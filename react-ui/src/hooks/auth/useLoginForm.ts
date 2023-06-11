import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormValidator } from "@/hooks/auth/useRegisterForm";
import useLogin from "@/hooks/auth/useLogin";

export const loginFormValidator = registerFormValidator.pick({ email: true, password: true });

export type LoginFormSchema = z.infer<typeof loginFormValidator>;

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginFormValidator) });

  const [loginUser, { loading, error: gqlError }] = useLogin();

  const onSubmit = (formData: LoginFormSchema) => {
    if (!loading) {
      loginUser({
        variables: { input: formData },
      });
    }
  };

  return { register, onSubmit: handleSubmit(onSubmit), loading, errors, gqlError };
};

export type LoginFormProps = ReturnType<typeof useLoginForm>;

export default useLoginForm;
