import { gql, useQuery } from "@apollo/client";

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

const useAuthUser = () => useQuery(GET_AUTH_USER);
 
export default useAuthUser;