import { OnSubscriptionDataOptions, useSubscription } from "@apollo/client";
import { graphql } from "../../gql";
import { OnUserTypingSubscription, UserTypingInput } from "../../gql/graphql";
import useAuthUser from "../auth/useAuthUser";

const USER_TYPING_SUBSCRIPTION = graphql(`
  subscription OnUserTyping($input: UserTypingInput!) {
    userTyping(userTypingInput: $input) {
      userId
      username
      channelId
    }
  }
`);

const useTypingSubscription = (onSubscriptionData: (options: OnSubscriptionDataOptions<OnUserTypingSubscription>) => any, channelId?: number) => {
  const { data } = useAuthUser();
  if (!data) return;
  let input: UserTypingInput = { userId: data.me.id };
  if (channelId) input = { ...input, channelId };
  return useSubscription(USER_TYPING_SUBSCRIPTION, {
    variables: { input },
    onSubscriptionData,
  });
};

export default useTypingSubscription;
