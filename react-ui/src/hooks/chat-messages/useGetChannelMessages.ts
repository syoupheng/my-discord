import { useParams } from "react-router-dom";
import { MESSAGE_INFO } from "../../fragments/messages";
import { useFragment } from "../../gql";
import useChatMessages from "./useChatMessages";

const useGetChannelMessages = () => {
  const { channelId } = useParams();
  const { data } = useChatMessages(parseInt(channelId!));
  const messages = useFragment(MESSAGE_INFO, data ? data.getMessages.messages : []);
  return messages;
};

export default useGetChannelMessages;
