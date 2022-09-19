import { Link } from "react-router-dom";
import Button from "../components/shared/buttons/Button";
import SubmitButton from "../components/shared/buttons/SubmitButton";
import FormContainer from "../components/Form/FormContainer";
import FormGroup from "../components/Form/FormGroup";
import FormInput from "../components/Form/FormInput";

const LoginPage = () => {
  return (
    <FormContainer>
      <form>
        <h1 className="text-white font-bold text-2xl text-center mb-2">
          Ha, te revoilà !
        </h1>
        <p className="text-center text-secondary font-light text-[15.3px] mb-5">
          Nous sommes si heureux de te revoir !
        </p>
        {/* <FormGroup>
          <FormLabel required>E-mail</FormLabel>
          <FormInput />
        </FormGroup>
        <FormGroup>
          <FormLabel required>Mot de passe</FormLabel>
          <FormInput type="password" />
        </FormGroup> */}
        <SubmitButton value="Connexion" />
        <div className="text-sm mt-2">
          <span className="text-secondary">Besoin d'un compte ? </span>
          <Link to="/register" className="hover:underline text-link">
            S'inscrire
          </Link>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
