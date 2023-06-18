import { useQuery } from "@apollo/client";
import { graphql } from "@/gql";

export const GET_AUTH_USER_GROUPS = graphql(`
  query GetGroups {
    me {
      privateGroups {
        ...PrivateGroup
      }
    }
  }
`);

const usePrivateGroups = () => {
  const { data } = useQuery(GET_AUTH_USER_GROUPS, { fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook should be called in the authenticated part of the app");
  return data.me.privateGroups;
};

export default usePrivateGroups;
