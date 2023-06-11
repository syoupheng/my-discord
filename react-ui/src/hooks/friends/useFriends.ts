import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";

export const GET_AUTH_USER_FRIENDS = graphql(`
  query GetFriends {
    me {
      friends {
        ...Friend
      }
    }
  }
`);

const useFriends = () => {
  const { data } = useQuery(GET_AUTH_USER_FRIENDS, { fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook should be called in the authenticated part of the app");
  return data.me.friends;
};

export default useFriends;
