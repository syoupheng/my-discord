import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { DEFAULT_ROUTE } from "../../main";
import { LoginInput } from "../../types/auth";
import { User } from "../../types/user";
import { GET_AUTH_USER } from "./useAuthUser";

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
  const client = useApolloClient();

  return useMutation<{ login: User }, { input: LoginInput }>(LOGIN_USER, {
    onCompleted: (data) => {
      client.writeQuery({ query: GET_AUTH_USER, data: { me: data.login } });
      navigate(DEFAULT_ROUTE);
    },
  });
};

export default useLogin;
