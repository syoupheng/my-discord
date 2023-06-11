import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { PRIVATE_GROUP_FRAGMENT } from "@/fragments/auth";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { Reference } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATE_GROUP = graphql(`
  mutation createGroup($membersIds: [Int!]!) {
    createGroup(membersIds: $membersIds) {
      ...PrivateGroup
    }
  }
`);

const useCreateGroup = () => {
  const navigate = useNavigate();

  return useAuthMutation(CREATE_GROUP, {
    onCompleted: (data) => {
      setTimeout(() => navigate(`/channels/@me/${data?.createGroup.id}`), 300);
    },
    update(cache, { data }) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateGroups(existingGroupRefs = [], { readField }) {
            const { createGroup: newData } = data;
            const newGroupRef = cache.writeFragment({
              data: newData,
              fragment: PRIVATE_GROUP_FRAGMENT
            });

            if (existingGroupRefs.some((ref: Reference) => readField("id", ref) === newData)) return existingGroupRefs;

            return [newGroupRef, ...existingGroupRefs];
          },
        },
      });
    },
  });
};

export default useCreateGroup;
