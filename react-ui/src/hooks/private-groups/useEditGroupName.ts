import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";

const EDIT_GROUP_NAME = graphql(`
  mutation editGroupName($input: EditNameInput!) {
    editGroupName(editNameInput: $input) {
      id
      name
    }
  }
`);

const useEditGroupName = () => {
  return useAuthMutation(EDIT_GROUP_NAME);
};

export default useEditGroupName;
