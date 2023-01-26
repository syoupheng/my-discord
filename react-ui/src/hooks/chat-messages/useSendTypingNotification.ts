import { useParams } from "react-router-dom";
import { graphql } from "../../gql";
import useAuthMutation from "../auth/useAuthMutation";

const SEND_TYPING_NOTIFICATION = graphql(`
  mutation SendTypingNotification($channelId: Int!) {
    typingMessage(channelId: $channelId)
  }
`);

const useSendTypingNotification = () => {
  const { channelId } = useParams();
  return useAuthMutation(SEND_TYPING_NOTIFICATION, { variables: { channelId: parseInt(channelId!) } });
};

export default useSendTypingNotification;
