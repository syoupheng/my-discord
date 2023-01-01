import { ChannelMember } from "../../gql/graphql";
import useAuthUser from "../auth/useAuthUser";

const useIsMentioned = (mentions: ChannelMember[]) => {
  const { data } = useAuthUser();
  if (!data) return false;
  const { id: authUserId } = data.me;
  return mentions.some((mention) => mention.id === authUserId);
};

export default useIsMentioned;
