import { graphql } from "@/gql";
import { AuthUserFragment } from "@/gql/graphql";
import useAuthUser from "@/hooks/auth/useAuthUser";
import { useEffect } from "react";

const UPDATED_GROUP_SUBSCRIPTION = graphql(`
  subscription onModifyPrivateGroup($userId: Int!) {
    modifiedPrivateGroup(userId: $userId) {
      ...PrivateGroup
    }
  }
`);

const useAddedToGroupSubscription = () => {
  const { subscribeToMore, data } = useAuthUser();

  useEffect(() => {
    let unsubscribe: () => void;
    if (data) {
      unsubscribe = subscribeToMore({
        document: UPDATED_GROUP_SUBSCRIPTION,
        variables: { userId: data.me.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newPrivateGroup = subscriptionData.data.modifiedPrivateGroup;
          const newData: AuthUserFragment = {
            ...prev.me,
            privateGroups: prev.me.privateGroups.some((group) => group.id === newPrivateGroup.id)
              ? prev.me.privateGroups
              : [newPrivateGroup, ...prev.me.privateGroups],
          };

          return { me: newData };
        },
      });
    }

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useAddedToGroupSubscription;
