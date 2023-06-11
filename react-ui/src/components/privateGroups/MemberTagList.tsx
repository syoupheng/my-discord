import GroupMemberTag from "@/components/privateGroups/GroupMemberTag";
import { FriendFragment } from "@/gql/graphql";

type Props = {
  selectedMembersIds: number[];
  friends: FriendFragment[];
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
