import { ChannelMemberFragment } from "@/gql/graphql";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";

const useIsMentioned = (mentions: ChannelMemberFragment[]) => {
  const { id } = useAuthUserInfo();
  return mentions.some((mention) => mention.id === id);
};

export default useIsMentioned;
