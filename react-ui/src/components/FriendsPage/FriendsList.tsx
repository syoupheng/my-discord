import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import { User } from "../../types/user";
import FriendListItem from "./FriendListItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const friendsStatusMap = {
  ALL: "Tous les amis",
  ONLINE: "En ligne",
  PENDING: "En attente",
  BLOCKED: "Bloqués",
  ADD_FRIEND: "",
};

interface Props {
  friends: User[];
}

const FriendsList = ({ friends }: Props) => {
  const [selectedTab] = useFriendsTab();

  const [friendsListRef] = useAutoAnimate<HTMLDivElement>({ duration: 180 });

  return (
    <>
      <div>
        <h2 className="mt-4 mr-5 mb-2 ml-[30px] flex-auto text-h-secondary whitespace-nowrap overflow-hidden uppercase text-xs font-medium">
          {selectedTab && friendsStatusMap[selectedTab]} - {friends.length}
        </h2>
      </div>
      <div className="relative overflow-y-scroll overflow-x-hidden pr-0 pb-2 mt-2 min-h-0 flex-auto">
        <div ref={friendsListRef} className="absolute w-full">
          {friends.length > 0
            ? friends.map((friend, idx) => (
                <FriendListItem key={friend.id} friend={friend} index={idx} />
              ))
            : "Vous n'avez pas d'amis pour le moment"}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
