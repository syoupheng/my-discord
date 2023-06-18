import { graphql } from "@/gql";
import { GET_AUTH_USER } from "@/hooks/auth/useAuthUser";
import { DEFAULT_ROUTE } from "@/main";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = graphql(`
  mutation LoginUser($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      ...AuthUser
    }
  }
`);

const useLogin = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  return useMutation(LOGIN_USER, {
    onError: (err) => {
      console.error(err.message);
    },
    onCompleted: (data) => {
      client.writeQuery({ query: GET_AUTH_USER, data: { me: data.login } });
      navigate(DEFAULT_ROUTE);
    },
  });
};

export default useLogin;
