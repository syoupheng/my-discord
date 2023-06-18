import { Reference } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import { DEFAULT_ROUTE } from "@/main";
import { AUTH_USER_CACHE_ID } from "@/apollo.config";
import { LeaveGroupMutation } from "@/gql/graphql";

const LEAVE_GROUP = graphql(`
  mutation leaveGroup($groupId: Int!) {
    leaveGroup(groupId: $groupId) {
      id
    }
  }
`);

const useLeaveGroup = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return useAuthMutation(LEAVE_GROUP, {
    onCompleted: ({ leaveGroup: data }) => {
      if (pathname.includes(`/channels/@me/${data.id}`)) navigate(DEFAULT_ROUTE);
    },
    update(cache, { data }: { data?: LeaveGroupMutation }) {
      if (!data) return;
      cache.modify({
        id: AUTH_USER_CACHE_ID,
        fields: {
          privateGroups(existingGroupRefs, { readField }) {
            const { leaveGroup: newData } = data;
            return existingGroupRefs.filter((ref: Reference) => readField("id", ref) !== newData.id);
          },
        },
      });
    },
  });
};

export default useLeaveGroup;
