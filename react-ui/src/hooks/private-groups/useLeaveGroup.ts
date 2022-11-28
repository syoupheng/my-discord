import { gql } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_USER_CACHE_ID } from "../../apollo.config";
import { DEFAULT_ROUTE } from "../../main";
import useAuthMutation from "../auth/useAuthMutation";

const LEAVE_GROUP = gql`
  mutation leaveGroup($groupId: Int!) {
    leaveGroup(groupId: $groupId) {
      id
    }
  }
`;

interface MutationResponse {
  leaveGroup: {
    id: number;
  };
}

const useLeaveGroup = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return useAuthMutation<MutationResponse>(LEAVE_GROUP, {
    onCompleted: ({ leaveGroup: data }) => {
      if (pathname.includes(`/channels/@me/groups/${data.id}`)) navigate(DEFAULT_ROUTE);
    },
    update(cache, { data }) {
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateGroups(existingGroupRefs, { readField }) {
            const { leaveGroup: newData } = data!;
            return existingGroupRefs.filter((ref: any) => readField("id", ref) !== newData.id);
          },
        },
      });
    },
  });
};

export default useLeaveGroup;
