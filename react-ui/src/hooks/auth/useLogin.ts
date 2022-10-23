import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { DEFAULT_ROUTE } from "../../main";
import { LoginInput } from "../../types/auth";
import { User } from "../../types/user";

const LOGIN_USER = gql`
  ${AUTH_USER_FIELDS}
  mutation LoginUser($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      ...AuthUserFields
    }
  }
`;

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<User, { input: LoginInput }>(LOGIN_USER, {
    onCompleted: () => navigate(DEFAULT_ROUTE),
  });
};

export default useLogin;
