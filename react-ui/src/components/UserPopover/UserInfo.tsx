import UserProfilePopover from "@/components/UserPopover/UserProfilePopover";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import { RiSettings5Fill } from "react-icons/ri";

const UserInfo = () => {
  return (
    <section className="bg-secondary-alt p-2 flex justify-between flex-nowrap">
      <UserProfilePopover />
      <div className="text-h-secondary flex items-center">
        <TooltipWrapper tooltipTxt="Coming soon !" size="sm" className="cursor-pointer p-2 rounded hover:bg-grey-hov group relative">
          <RiSettings5Fill size={19} />
        </TooltipWrapper>
      </div>
    </section>
  );
};

export default UserInfo;
