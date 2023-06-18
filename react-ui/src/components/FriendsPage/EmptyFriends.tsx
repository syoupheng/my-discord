import Button from "@/components/shared/buttons/Button";
import useFriendsTab from "@/hooks/friendsNavTab/useFriendsTab";
import { FriendTabModel } from "@/models/friend-tab/friend-tab-model.interface";

type Props = {
  search?: boolean;
  friendTabModel: FriendTabModel;
};

const EmptyFriends = ({ search = false, friendTabModel }: Props) => {
  const [selectedTab, setSelectedTab] = useFriendsTab();
  const emptySearchImage = {
    imageUrl: "/empty_search.svg",
    text: "Wumpus a cherché mais il n'y a personne avec ce nom.",
    height: "218px",
    width: "421px",
  };
  const { imageUrl, text, height, width } = search ? emptySearchImage : friendTabModel.emptyImage;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full h-full max-w-md mx-auto flex-auto flex flex-col flex-nowrap justify-center items-center">
        <div className="flex-initial bg-cover mb-10" style={{ backgroundImage: `url(${imageUrl})`, height, width }} />
        <div className="flex-initial mt-2 text-center text-sm text-muted">{text}</div>
        {selectedTab === "ALL" && !search && (
          <Button className="mt-4 text-btw-sm-xs" onClick={() => setSelectedTab("ADD_FRIEND")}>
            Ajouter un ami
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyFriends;
