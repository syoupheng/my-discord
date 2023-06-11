import FormContainer from "@/components/Form/FormContainer";
import FormError from "@/components/Form/FormError";
import FormGroup from "@/components/Form/FormGroup";
import FormInput from "@/components/Form/FormInput";
import Spinner from "@/components/shared/Spinner";
import Button from "@/components/shared/buttons/Button";
import { LoginFormProps } from "@/hooks/auth/useLoginForm";
import { Link } from "react-router-dom";

type Props = LoginFormProps & {
  onSubmit: (...args: any) => any;
};

const LoginForm = ({ onSubmit, register, errors, gqlError, loading }: Props) => {
  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <h1 className="text-white font-bold text-2xl text-center mb-2">Ha, te revoilà !</h1>
        <p className="text-center text-h-secondary text-btw-base-sm mb-5">Nous sommes si heureux de te revoir !</p>
        <FormGroup>
          <FormInput label="E-mail" required error={errors.email} gqlError={gqlError} {...register("email")} />
        </FormGroup>
        <FormGroup>
          <FormInput label="Mot de passe" required error={errors.password} gqlError={gqlError} type="password" {...register("password")} />
        </FormGroup>
        <Button type="submit" disabled={loading} fullWidth>
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

export default LoginForm;
