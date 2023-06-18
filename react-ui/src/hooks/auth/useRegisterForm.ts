import useRegister from "@/hooks/auth/useRegister";
import { filterEmptyFields } from "@/utils/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerFormValidator = z.object({
  email: z.string().min(1, "Veuillez renseigner votre email").email("Veuillez renseigner une adresse email valide"),
  username: z.string().min(1, "Veuillez renseigner votre nom d'utilisateur"),
  phoneNumber: z.string().optional(),
  password: z
    .string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères")
    .max(20, "Votre mot de passe doit contenir moins de 20 caractères"),
});

export type RegisterFormSchema = z.infer<typeof registerFormValidator>;

const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({ resolver: zodResolver(registerFormValidator) });

  const [registerUser, { loading, error: gqlError }] = useRegister();

  const onSubmit = (formData: RegisterFormSchema) => {
    registerUser({ variables: { input: filterEmptyFields(formData, registerFormValidator) } });
  };

  return { register, onSubmit: handleSubmit(onSubmit), loading, errors, gqlError };
};

export type RegisterFormProps = ReturnType<typeof useRegisterForm>;

export default useRegisterForm;
