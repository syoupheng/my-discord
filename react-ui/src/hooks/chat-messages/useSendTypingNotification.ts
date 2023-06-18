import { graphql } from "@/gql";
import useAuthMutation from "@/hooks/auth/useAuthMutation";
import useLogoutOnError from "@/hooks/auth/useLogoutOnError";
import { useParams } from "react-router-dom";

const SEND_TYPING_NOTIFICATION = graphql(`
  mutation SendTypingNotification($channelId: Int!) {
    typingMessage(channelId: $channelId)
  }
`);

const useSendTypingNotification = () => {
  const { channelId } = useParams();
  const onError = useLogoutOnError();
  return useAuthMutation(SEND_TYPING_NOTIFICATION, { variables: { channelId: parseInt(channelId!) }, onError });
};

export default useSendTypingNotification;
