import { AuthUserSubscriptionParams } from "@/components/PrivateApp";
import { graphql } from "@/gql";
import { AuthUserFragment } from "@/gql/graphql";
import { useEffect } from "react";

const UPDATED_GROUP_SUBSCRIPTION = graphql(`
  subscription onModifyPrivateGroup($userId: Int!) {
    modifiedPrivateGroup(userId: $userId) {
      ...PrivateGroup
    }
  }
`);

const useUpdatedGroupSubscription = ({ authUserId, subscribeToMore }: AuthUserSubscriptionParams) => {
  useEffect(() => {
    let unsubscribe: () => void;
    unsubscribe = subscribeToMore({
      document: UPDATED_GROUP_SUBSCRIPTION,
      variables: { userId: authUserId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPrivateGroup = subscriptionData.data.modifiedPrivateGroup;
        let newPrivateGroups = [...prev.me.privateGroups];
        const privateGroupToModifyIndex = newPrivateGroups.findIndex((group) => group.id === newPrivateGroup.id);
        console.log({ privateGroupToModifyIndex });
        if (privateGroupToModifyIndex === -1) {
          newPrivateGroups = [newPrivateGroup, ...prev.me.privateGroups];
        } else {
          console.log({ newPrivateGroup });
          newPrivateGroups[privateGroupToModifyIndex] = newPrivateGroup;
        }
        const newData: AuthUserFragment = {
          ...prev.me,
          privateGroups: newPrivateGroups,
        };

        return { me: newData };
      },
    });

    return () => !!unsubscribe && unsubscribe();
  }, []);
};

export default useUpdatedGroupSubscription;
