import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormContainer from "../components/Form/FormContainer";
import FormGroup from "../components/Form/FormGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/Form/FormInput";
import SubmitButton from "../components/shared/buttons/SubmitButton";
import { registerSchema, RegisterInput } from "../types/auth";
import { filterEmptyFields } from "../utils";
import useRegister from "../hooks/useRegister";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const [registerUser, { data: authUser, loading, error }] = useRegister();

  const onSubmit = (formData: RegisterInput) => {
    registerUser({ variables: { input: filterEmptyFields(formData, registerSchema) } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white font-bold text-2xl text-center mb-2">
          Créer un compte
        </h1>
        <FormGroup>
          <FormInput
            label="E-mail"
            required
            error={errors.email}
            {...register("email")}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Nom d'utilisateur"
            required
            error={errors.username}
            {...register("username")}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Numéro de téléphone"
            error={errors.phoneNumber}
            {...register("phoneNumber")}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Mot de passe"
            required
            error={errors.password}
            type="password"
            {...register("password")}
          />
        </FormGroup>
        <SubmitButton value="Continuer" />
        <div className="text-sm mt-2">
          <Link to="/login" className="hover:underline text-link">
            Tu as déjà un compte ?
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default RegisterPage;
