import { graphql } from "@/gql";
import { GET_AUTH_USER } from "@/hooks/auth/useAuthUser";
import { DEFAULT_ROUTE } from "@/main";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_USER = graphql(`
  mutation RegisterUser($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      ...AuthUser
    }
  }
`);

const useRegister = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  return useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      client.writeQuery({ query: GET_AUTH_USER, data: { me: data.register } });
      navigate(DEFAULT_ROUTE);
    },
  });
};

export default useRegister;
