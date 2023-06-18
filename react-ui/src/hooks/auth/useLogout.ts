import { graphql } from "@/gql";
import { PUBLIC_ROUTES } from "@/main";
import { useApolloClient, useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";

const LOGOUT_USER = graphql(`
  mutation logoutUser {
    logout {
      success
    }
  }
`);

const useLogout = () => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const location = useLocation();
  return useMutation(LOGOUT_USER, {
    onCompleted: async () => {
      await client.clearStore();
      if (!PUBLIC_ROUTES.includes(location.pathname)) navigate("/login");
    },
  });
};

export default useLogout;
