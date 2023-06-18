import FormContainer from "@/components/Form/FormContainer";
import FormError from "@/components/Form/FormError";
import FormGroup from "@/components/Form/FormGroup";
import FormInput from "@/components/Form/FormInput";
import Spinner from "@/components/shared/Spinner";
import Button from "@/components/shared/buttons/Button";
import { RegisterFormProps } from "@/hooks/auth/useRegisterForm";
import { Link } from "react-router-dom";

type Props = RegisterFormProps & {
  onSubmit: (...args: any) => any;
};

const RegisterForm = ({ onSubmit, register, errors, gqlError, loading }: Props) => {
  return (
    <FormContainer>
      <form autoComplete="off" onSubmit={onSubmit}>
        <h1 className="text-white font-bold text-2xl text-center mb-2">Créer un compte</h1>
        <FormGroup>
          <FormInput label="E-mail" required error={errors.email} gqlError={gqlError} {...register("email")} />
        </FormGroup>
        <FormGroup>
          <FormInput autoComplete="off" label="Nom d'utilisateur" required error={errors.username} gqlError={gqlError} {...register("username")} />
        </FormGroup>
        <FormGroup>
          <FormInput label="Numéro de téléphone" error={errors.phoneNumber} gqlError={gqlError} {...register("phoneNumber")} />
        </FormGroup>
        <FormGroup>
          <FormInput
            autoComplete="off"
            label="Mot de passe"
            required
            error={errors.password}
            gqlError={gqlError}
            type="password"
            {...register("password")}
          />
        </FormGroup>
        <Button type="submit" disabled={loading} fullWidth>
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

export default RegisterForm;
