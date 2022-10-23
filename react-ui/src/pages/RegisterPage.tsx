import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormContainer from "../components/Form/FormContainer";
import FormGroup from "../components/Form/FormGroup";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/Form/FormInput";
import { registerSchema, RegisterInput } from "../types/auth";
import useRegister from "../hooks/auth/useRegister";
import Button from "../components/shared/buttons/Button";
import Spinner from "../components/shared/Spinner";
import FormError from "../components/Form/FormError";
import { filterEmptyFields } from "../utils/form";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const [registerUser, { loading, error: gqlError }] = useRegister();

  const onSubmit = (formData: RegisterInput) => {
    registerUser({ variables: { input: filterEmptyFields(formData, registerSchema) } });
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white font-bold text-2xl text-center mb-2">Créer un compte</h1>
        <FormGroup>
          <FormInput
            label="E-mail"
            required
            error={errors.email}
            gqlError={gqlError}
            {...register("email")}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Nom d'utilisateur"
            required
            error={errors.username}
            gqlError={gqlError}
            {...register("username")}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Numéro de téléphone"
            error={errors.phoneNumber}
            gqlError={gqlError}
            {...register("phoneNumber")}
          />
        </FormGroup>
        <FormGroup>
          <FormInput
            label="Mot de passe"
            required
            error={errors.password}
            gqlError={gqlError}
            type="password"
            {...register("password")}
          />
        </FormGroup>
        <Button type="submit" disabled={loading} className="w-full h-11 text-btw-base-sm">
          {loading ? <Spinner white /> : "Connexion"}
        </Button>
        {gqlError && <FormError message={gqlError.message} />}
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
