import { gql, useMutation } from "@apollo/client";
import { LoginInput, User } from "../types/auth";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      id
      username
      email
      status
      phoneNumber
    }
  }
`;

const useLogin = () => {
  return useMutation<User, { input: LoginInput }>(LOGIN_USER);
}
 
export default useLogin;