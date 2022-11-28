import { gql } from "@apollo/client";
import useAuthMutation from "../auth/useAuthMutation";

const ADD_MEMBERS_TO_GROUP = gql`
  mutation addGroupMembers($groupId: Int!, $membersIds: [Int!]!) {
    addGroupMembers(groupId: $groupId, membersIds: $membersIds) {
      id
      members {
        id
        username
      }
    }
  }
`;

const useAddToGroup = () => {
  return useAuthMutation(ADD_MEMBERS_TO_GROUP);
};

export default useAddToGroup;
