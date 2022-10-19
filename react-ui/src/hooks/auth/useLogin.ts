import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DEFAULT_ROUTE } from "../../main";
import { LoginInput } from "../../types/auth";
import { User } from "../../types/user";

const LOGIN_USER = gql`
  mutation LoginUser($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      id
      username
      email
      status
      phoneNumber
      friends {
        id
        username
        status
      }
      friendRequests {
        sender {
          id
          username
        }
        recipient {
          id
          username
        }
      }
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
