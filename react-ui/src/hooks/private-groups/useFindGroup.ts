import { useParams } from "react-router-dom";
import usePrivateGroups from "./usePrivateGroups";

const useFindGroup = () => {
  const { groupId } = useParams();
  const { data } = usePrivateGroups();
  if (!data) return null;
  const group = groupId ? data.me.privateGroups.find((group) => group.id === parseInt(groupId)) : null;
  return group;
};

export default useFindGroup;
