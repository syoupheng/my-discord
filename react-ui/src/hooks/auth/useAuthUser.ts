import { gql, useQuery } from "@apollo/client";
import { User } from "../../types/user";

const GET_AUTH_USER = gql`
  query GetAuthUser {
    me {
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

const useAuthUser = () => useQuery<User>(GET_AUTH_USER);

export default useAuthUser;
