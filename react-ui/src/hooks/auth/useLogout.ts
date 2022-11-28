import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGOUT_USER = gql`
  mutation logoutUser {
    logout {
      success
    }
  }
`;

const useLogout = () => {
  const navigate = useNavigate();
  const client = useApolloClient();

  return useMutation<{ logout: { success: boolean } }>(LOGOUT_USER, {
    onCompleted: () => {
      client.resetStore();
      navigate("/login");
    },
  });
};

export default useLogout;
