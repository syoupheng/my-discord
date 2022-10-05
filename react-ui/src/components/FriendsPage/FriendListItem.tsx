import DiscordAvatar from "../shared/DiscordAvatar";

const FriendListItem = () => {
  return (
    <div className="h-[62px] ml-[30px] mr-5 font-medium overflow-hidden cursor-pointer border-t border-t-grey-border">
      <div className="flex grow items-center max-w-full justify-between">
        <div className="flex overflow-hidden">
          <DiscordAvatar className="mr-3" />
          <div className="flex flex-col overflow-hidden">
            <h4 className="whitespace-nowrap overflow-hidden font-semibold text-white">
              batman
            </h4>
            <div className="whitespace-nowrap text-h-secondary overflow-hidden text-sm">Hors ligne</div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default FriendListItem;