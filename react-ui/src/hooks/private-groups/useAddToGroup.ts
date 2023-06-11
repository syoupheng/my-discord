import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";

const ADD_MEMBERS_TO_GROUP = graphql(`
  mutation addGroupMembers($groupId: Int!, $membersIds: [Int!]!) {
    addGroupMembers(groupId: $groupId, membersIds: $membersIds) {
      id
      members {
        id
        username
      }
    }
  }
`);

const useAddToGroup = () => {
  return useAuthMutation(ADD_MEMBERS_TO_GROUP);
};

export default useAddToGroup;
