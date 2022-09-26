import { gql, useApolloClient } from "@apollo/client";
import { User } from "../../types/auth";

const useAuthUserCache = (): User | null => {
  const client = useApolloClient();
  return client.readFragment({
    id: 'AuthUser:{}',
    fragment: gql`
      fragment Data on AuthUser {
        id
        username
        email
        status
        phoneNumber
      }
    `
  });
}

export default useAuthUserCache;