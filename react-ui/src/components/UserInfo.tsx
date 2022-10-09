import useAuthUserCache from "../hooks/auth/useAuthUserCache";
import DiscordAvatar from "./shared/DiscordAvatar";
import { RiSettings5Fill } from 'react-icons/ri';
import Tooltip from "./shared/Tooltip";

const UserInfo = () => {
  const authUser = useAuthUserCache();
  return (
    <section className="fixed bottom-0 w-[240px] bg-secondary-alt p-2 flex justify-between z-10">
      <div className="flex items-center rounded hover:bg-grey-hov cursor-pointer grow">
        <DiscordAvatar className="mr-2" />
        <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs">
          <div className="text-white font-bold">{authUser?.username}</div>
          <div className="text-h-secondary">#{authUser?.id}</div>
        </div>
      </div>
      <div className= "text-h-secondary flex items-center">
        {/* <div className="cursor-pointer p-2 rounded hover:bg-grey-hov">
          <FaMicrophone size={16} />
        </div> */}
        <div className="cursor-pointer p-2 rounded hover:bg-grey-hov group relative">
          <RiSettings5Fill size={19} />
          <Tooltip tooltipTxt="Paramètres utilisateur" className="origin-top -top-12 -left-16 text-xs" />
        </div>
      </div>
    </section>
  );
}
 
export default UserInfo;