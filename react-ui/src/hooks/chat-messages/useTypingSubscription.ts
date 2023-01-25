import { useSubscription } from "@apollo/client";
import { useParams } from "react-router-dom";
import { graphql } from "../../gql";
import useAuthUser from "../auth/useAuthUser";

const USER_TYPING_SUBSCRIPTION = graphql(`
  subscription OnUserTyping($channelId: Int!, $userId: Int!) {
    userTyping(channelId: $channelId, userId: $userId) {
      userId
      username
      channelId
    }
  }
`);

const useTypingSubscription = () => {
  const { channelId } = useParams();
  const { data } = useAuthUser();
  if (!data) return;
  return useSubscription(USER_TYPING_SUBSCRIPTION, {
    variables: { channelId: parseInt(channelId!), userId: data.me.id },
  });
};

export default useTypingSubscription;
