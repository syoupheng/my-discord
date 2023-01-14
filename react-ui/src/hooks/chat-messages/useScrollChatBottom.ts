import { useEffect, useLayoutEffect, useRef } from "react";
import { CHANNEL_MEMBER_FIELDS, MESSAGE_INFO } from "../../fragments/messages";
import { useFragment } from "../../gql";
import { GetMessagesQuery } from "../../gql/graphql";
import useAuthUser from "../auth/useAuthUser";
import { MESSAGES_LIMIT } from "./useChatMessages";

const useScrollChatBottom = (messagesData: GetMessagesQuery | undefined) => {
  const bottomMessageListRef = useRef<HTMLDivElement>(null);
  const messages = useFragment(MESSAGE_INFO, messagesData ? messagesData.getMessages.messages : []);
  const { data: authUserData } = useAuthUser();
  const lastMessageId = messages.at(-1)?.id;
  const lastMessageAuthor = useFragment(CHANNEL_MEMBER_FIELDS, messages.at(-1)?.author);
  useEffect(() => {
    if (bottomMessageListRef.current && authUserData?.me.id === lastMessageAuthor?.id) bottomMessageListRef.current.scrollIntoView();
  }, [lastMessageId]);
  const loadedInitialData = useRef(false);
  useLayoutEffect(() => {
    if (bottomMessageListRef.current && !loadedInitialData.current && messages.length <= MESSAGES_LIMIT) {
      bottomMessageListRef.current.scrollIntoView();
    }
    if (messagesData) loadedInitialData.current = true;
  }, [messagesData]);
  return bottomMessageListRef;
};

export default useScrollChatBottom;
