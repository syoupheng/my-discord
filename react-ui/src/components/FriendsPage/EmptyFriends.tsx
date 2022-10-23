import useFriendsTab from "../../hooks/friendsNavTab/useFriendsTab";
import { FriendsTabValues } from "../../providers/FriendsTabProvider";

const selectedTabMap: Record<
  FriendsTabValues | "SEARCH",
  { imageUrl: string; text: string; height: string; width: string }
> = {
  ALL: {
    imageUrl: "/no_friends.svg",
    text: "Wumpus attend des amis. Mais rien ne t'oblige à en ajouter !",
    height: "162px",
    width: "376px",
  },
  ONLINE: {
    imageUrl: "/no_friends-online.svg",
    text: "Il n'y a personne dans les parages pour jouer avec Wumpus.",
    height: "218px",
    width: "421px",
  },
  PENDING: {
    imageUrl: "/no_friends_requests.svg",
    text: "Il n'y a aucune demande d'ami en attente. Tiens, voilà Wumpus en attendant .",
    height: "200px",
    width: "415px",
  },
  ADD_FRIEND: {
    imageUrl: "/no_friends.svg",
    text: "Wumpus attend des amis. Mais rien ne t'oblige à en ajouter !",
    height: "162px",
    width: "376px",
  },
  BLOCKED: {
    imageUrl: "/no_friends_blocked.svg",
    text: "Tu ne peux pas débloquer le Wumpus.",
    height: "232px",
    width: "433px",
  },
  SEARCH: {
    imageUrl: "/empty_search.svg",
    text: "Wumpus a cherché mais il n'y a personne avec ce nom.",
    height: "218px",
    width: "421px",
  },
};

interface Props {
  search?: boolean;
}

const EmptyFriends = ({ search = false }: Props) => {
  const [selectedTab] = useFriendsTab();

  if (!selectedTab) return null;

  const { imageUrl, text, height, width } = selectedTabMap[search ? "SEARCH" : selectedTab];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full h-full max-w-md mx-auto flex-auto flex flex-col flex-nowrap justify-center items-center">
        <div
          className="flex-initial bg-cover mb-10"
          style={{ backgroundImage: `url(${imageUrl})`, height, width }}
        ></div>
        <div className="flex-initial mt-2 text-center text-sm text-muted">{text}</div>
      </div>
    </div>
  );
};

export default EmptyFriends;
