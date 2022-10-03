import { Link } from "react-router-dom";
import FormContainer from "../components/Form/FormContainer";
import FormGroup from "../components/Form/FormGroup";
import FormInput from "../components/Form/FormInput";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../hooks/auth/useLogin";
import Button from "../components/shared/buttons/Button";
import Spinner from "../components/shared/Spinner";
import FormError from "../components/Form/FormError";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const [loginUser, { loading, error: gqlError }] = useLogin();

  const onSubmit = (formData: LoginInput) => {
    if (!loading) {
      loginUser({
        variables: { input: formData },
      });
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-white font-bold text-2xl text-center mb-2">
          Ha, te revoilà !
        </h1>
        <p className="text-center text-h-secondary font-light text-[15.3px] mb-5">
          Nous sommes si heureux de te revoir !
        </p>
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
            label="Mot de passe"
            required
            error={errors.password}
            gqlError={gqlError}
            type="password"
            {...register("password")}
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner white /> : "Connexion"}
        </Button>
        {gqlError && <FormError message={gqlError.message} />}
        <div className="text-sm mt-2">
          <span className="text-h-secondary">Besoin d'un compte ? </span>
          <Link to="/register" className="hover:underline text-link">
            S'inscrire
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
