import { Friend } from "../../types/user";
import GroupMemberTag from "./GroupMemberTag";

interface Props {
  selectedMembersIds: number[];
  friends: Friend[];
  handleClickMemberTag: (id: number) => void;
}

const MemberTagList = ({ selectedMembersIds, friends, handleClickMemberTag }: Props) => {
  return (
    <>
      {selectedMembersIds.map((id) => {
        const friend = friends.find((friend) => friend.id === id);
        if (friend) return <GroupMemberTag key={friend.id} friend={friend} handleClick={handleClickMemberTag} />;
      })}
    </>
  );
};

export default MemberTagList;
