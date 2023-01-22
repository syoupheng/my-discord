import { useSubscription } from "@apollo/client";
import { MESSAGE_INFO } from "../../fragments/messages";
import { graphql, useFragment } from "../../gql";
import useAuthUser from "../auth/useAuthUser";
import { GET_CHAT_MESSAGES } from "./useChatMessages";

const MESSAGE_RECEIVED_SUBSCRIPTION = graphql(`
  subscription OnMessageReceived($userId: Int!) {
    messageReceived(userId: $userId) {
      ...MessageInfo
    }
  }
`);

const useMessageReceivedSubscription = () => {
  const { data: authUserData } = useAuthUser({ fetchPolicy: "cache-only" });
  return useSubscription(MESSAGE_RECEIVED_SUBSCRIPTION, {
    variables: { userId: authUserData!.me.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newMessage = useFragment(MESSAGE_INFO, subscriptionData.data?.messageReceived);
      if (!newMessage) return;
      const cacheId = { query: GET_CHAT_MESSAGES, variables: { channelId: newMessage.channelId } };
      const exitsing = client.readQuery(cacheId);
      client.writeQuery({
        ...cacheId,
        data: {
          getMessages: {
            ...exitsing?.getMessages,
            messages: [newMessage],
          },
        },
      });
    },
  });
};

export default useMessageReceivedSubscription;
