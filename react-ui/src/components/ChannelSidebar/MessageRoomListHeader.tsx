import AddIcon from "@/components/Icons/AddIcon";
import AddNewGroupPopup from "@/components/privateGroups/AddNewGroupPopup";
import MyPopover from "@/components/shared/MyPopover";
import TooltipWrapper from "@/components/shared/TooltipWrapper";

const MessageRoomListHeader = () => {
  return (
    <MyPopover
      placement="bottom-start"
      offset={5}
      className="flex pt-4 pr-2 pb-1 pl-4 h-10 text-ellipsis overflow-hidden uppercase font-medium text-channels-default text-xs group mt-3"
    >
      <span className="flex-1 group-hover:text-secondary-light cursor-default">Messages privés</span>
      <TooltipWrapper
        tooltipTxt="Créer un MP"
        size="sm"
        className="h-4 w-4 mr-[2px] grow-0 shrink cursor-pointer text-h-secondary hover:text-secondary-light"
      >
        <MyPopover.Button className="focus:outline-none">
          <AddIcon size={16} />
        </MyPopover.Button>
      </TooltipWrapper>
      <MyPopover.Panel className="z-40 bg-primary border border-gray-800 w-[440px] rounded-md drop-shadow-lg animate-fade-in">
        {(close) => <AddNewGroupPopup closePopover={close} />}
      </MyPopover.Panel>
    </MyPopover>
  );
};

export default MessageRoomListHeader;
