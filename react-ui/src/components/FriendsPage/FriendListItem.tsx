import DiscordAvatar from "../shared/DiscordAvatar";

const FriendListItem = () => {
  return (
    <div className="flex h-[62px] ml-[30px] mr-5 font-medium overflow-hidden cursor-pointer border-t border-t-grey-border group hover:bg-mod-hov hover:border-t-0">
      <div className="flex grow items-center max-w-full justify-between">
        <div className="flex overflow-hidden">
          <DiscordAvatar className="mr-3 w-8 h-8 shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <div className="flex overflow-hidden grow items-end justify-start leading-[1.1]">
              <span className="whitespace-nowrap overflow-hidden font-semibold block flex-initial text-white">
                batman
              </span>
              <span className="text-h-secondary invisible text-sm leading-4 group-hover:visible">
                #5463
              </span>
            </div>
            <div className="text-h-secondary">
              <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs font-medium">
                En ligne
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default FriendListItem;