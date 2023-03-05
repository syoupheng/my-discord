import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../main";

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
  const location = useLocation();
  return useMutation<{ logout: { success: boolean } }>(LOGOUT_USER, {
    onCompleted: async () => {
      await client.clearStore();
      if (!PUBLIC_ROUTES.includes(location.pathname)) navigate("/login");
    },
  });
};

export default useLogout;
