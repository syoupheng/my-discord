import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";

export const GET_AUTH_USER_INFO = graphql(`
  query GetAuthUserInfo {
    me {
      ...AuthUserInfo
    }
  }
`);

const useAuthUserInfo = () => {
  const { data } = useQuery(GET_AUTH_USER_INFO, { fetchPolicy: "cache-only" });
  if (!data) throw new Error("This hook should be called in the authenticated part of the app");
  return data.me;
};

export default useAuthUserInfo;
