import useChatMessages from "@/hooks/chat-messages/useChatMessages";
import useSafeParams from "@/hooks/shared/useSafeParams";

const useGetChannelMessages = () => {
  const { channelId } = useSafeParams(["channelId"]);
  const { data } = useChatMessages(parseInt(channelId));
  return data ? data.getMessages.messages : [];
};

export default useGetChannelMessages;
