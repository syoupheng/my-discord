import { gql } from "@apollo/client";
import { EditGroupNameInput, PrivateGroup } from "../../types/private-group";
import useAuthMutation from "../auth/useAuthMutation";

const EDIT_GROUP_NAME = gql`
  mutation editGroupName($input: EditNameInput!) {
    editGroupName(editNameInput: $input) {
      id
      name
    }
  }
`;

interface MutationResponse {
  editGroupName: Pick<PrivateGroup, "id" | "name"> & { typename: string };
}

const useEditGroupName = () => {
  return useAuthMutation<MutationResponse, { input: EditGroupNameInput }>(EDIT_GROUP_NAME);
};

export default useEditGroupName;
