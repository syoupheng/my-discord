import { gql, useApolloClient } from "@apollo/client";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { Friend } from "../../types/user";

const useFriends = (): Friend[] => {
  const client = useApolloClient();
  const { friends } = client.readFragment({
    id: AUTH_USER_CACHE_ID,
    fragment: gql`
      fragment friends on AuthUser {
        friends {
          id
          username
          status
        }
      }
    `,
  });

  return friends;
};

export default useFriends;
