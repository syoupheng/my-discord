import { gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { PrivateGroup } from "../../types/private-group";
import useAuthMutation from "../auth/useAuthMutation";

const CREATE_GROUP = gql`
  mutation createGroup($membersIds: [Int!]!) {
    createGroup(membersIds: $membersIds) {
      id
      name
      createdAt
      members {
        id
        username
      }
    }
  }
`;

interface MutationResponse {
  createGroup: PrivateGroup;
}

const useCreateGroup = () => {
  const navigate = useNavigate();

  return useAuthMutation<MutationResponse>(CREATE_GROUP, {
    onCompleted: (data) => {
      navigate(`/channels/@me/groups/${data.createGroup.id}`);
    },
    update(cache, { data }) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateGroups(existingGroupRefs = [], { readField }) {
            const { createGroup: newData } = data as MutationResponse;
            const newGroupRef = cache.writeFragment({
              data: newData,
              fragment: gql`
                fragment NewPrivateGroup on PrivateGroup {
                  id
                  name
                  createdAt
                  members {
                    id
                    username
                  }
                }
              `,
            });

            if (existingGroupRefs.some((ref: any) => readField("id", ref) === newData)) return existingGroupRefs;

            return [newGroupRef, ...existingGroupRefs];
          },
        },
      });
    },
  });
};

export default useCreateGroup;
