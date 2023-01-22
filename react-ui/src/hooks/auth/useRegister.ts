import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_USER_FIELDS } from "../../fragments/auth";
import { DEFAULT_ROUTE } from "../../main";
import { RegisterInput } from "../../types/auth";
import { User } from "../../types/user";
import { GET_AUTH_USER } from "./useAuthUser";

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
  const client = useApolloClient();

  return useMutation<{ register: User }, { input: RegisterInput }>(REGISTER_USER, {
    onCompleted: (data) => {
      client.writeQuery({ query: GET_AUTH_USER, data: { me: data.register } });
      navigate(DEFAULT_ROUTE);
    },
  });
};

export default useRegister;
