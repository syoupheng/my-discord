import { gql, useApolloClient } from "@apollo/client";
import { Friend } from "../../types/user";

const useFriends = (): Friend[] => {
  const client = useApolloClient();
  const { friends } = client.readFragment({
    id: "AuthUser:{}",
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
