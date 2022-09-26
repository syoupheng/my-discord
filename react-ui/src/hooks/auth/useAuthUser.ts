import { gql, useQuery } from "@apollo/client";
import { User } from "../../types/auth";

const GET_AUTH_USER = gql`
  query GetAuthUser {
    me {
      id
      username
      email
      status
      phoneNumber
    }
  }
`;

const useAuthUser = () => useQuery<User>(GET_AUTH_USER);
 
export default useAuthUser;