import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../main";
import { RegisterInput, User } from "../../types/auth";

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      id
      username
      email
      status
      phoneNumber
    }
  }
`;

const useRegister = () => {

  const navigate = useNavigate();
  
  return useMutation<User, { input: RegisterInput }>(REGISTER_USER, {
    onCompleted: () => navigate(DEFAULT_ROUTE)
  });
}
 
export default useRegister;