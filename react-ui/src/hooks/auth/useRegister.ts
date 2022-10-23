import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { DEFAULT_ROUTE } from "../../main";
import { RegisterInput } from "../../types/auth";
import { User } from "../../types/user";

const REGISTER_USER = gql`
  ${AUTH_USER_FIELDS}
  mutation RegisterUser($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      ...AuthUserFields
    }
  }
`;

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<User, { input: RegisterInput }>(REGISTER_USER, {
    onCompleted: () => navigate(DEFAULT_ROUTE),
  });
};

export default useRegister;
