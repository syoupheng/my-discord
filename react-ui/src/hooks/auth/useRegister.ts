import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../main";
import { GET_AUTH_USER } from "./useAuthUser";
import { graphql } from "../../gql";

const REGISTER_USER = graphql(`
  mutation RegisterUser($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      ...AuthUserFields
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
