import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../main";
import { GET_AUTH_USER } from "./useAuthUser";
import { graphql } from "../../gql";

const LOGIN_USER = graphql(`
  mutation LoginUser($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      ...AuthUserFields
    }
  }
`);

const useLogin = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  return useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      client.writeQuery({ query: GET_AUTH_USER, data: { me: data.login } });
      navigate(DEFAULT_ROUTE);
    },
  });
};

export default useLogin;
