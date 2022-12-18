import { useParams } from "react-router-dom";
import usePrivateGroups from "./usePrivateGroups";

const useFindGroup = () => {
  const { channelId } = useParams();
  const { data } = usePrivateGroups();
  if (!data) return null;
  const group = channelId ? data.me.privateGroups.find((group) => group.id === parseInt(channelId)) : null;
  return group;
};

export default useFindGroup;
