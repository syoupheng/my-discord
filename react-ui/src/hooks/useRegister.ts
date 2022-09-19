import { gql, useMutation } from "@apollo/client";
import { RegisterInput, User } from "../types/auth";

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      me {
        id
        username
        email
        status
        phoneNumber
      }
    }
  }
`;

const useRegister = () => {
  return useMutation<User, { input: RegisterInput }>(REGISTER_USER);
}
 
export default useRegister;