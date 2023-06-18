import { graphql } from "@/gql";
import { OnUserTypingSubscription, UserTypingInput } from "@/gql/graphql";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";
import { OnSubscriptionDataOptions, useSubscription } from "@apollo/client";


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
  const authUser = useAuthUserInfo();
  let input: UserTypingInput = { userId: authUser.id };
  if (channelId) input = { ...input, channelId };
  return useSubscription(USER_TYPING_SUBSCRIPTION, {
    variables: { input },
    onSubscriptionData,
  });
};

export default useTypingSubscription;
