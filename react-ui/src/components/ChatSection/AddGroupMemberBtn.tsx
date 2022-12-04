import { offset, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import useTooltip from "../../hooks/ui/useTooltip";
import AddMemberIcon from "../Icons/AddMemberIcon";
import Tooltip from "../shared/Tooltip";
import Portal from "../shared/Portal";
import AddNewGroupPopup from "../privateGroups/AddNewGroupPopup";

interface Props {
  currentMembersIds: (number | undefined)[];
  groupId?: number | null;
}

const AddGroupMemberBtn = ({ currentMembersIds, groupId = null }: Props) => {
  const { containerRef, handleHover, isShown, setIsShown, position } = useTooltip({
    direction: "left",
  });

  const {
    x: popoverX,
    y: popoverY,
    reference: popoverRef,
    floating: panelRef,
    strategy: popoverStrat,
  } = useFloating({ placement: "bottom-end", middleware: [offset(5)] });

  return (
    <>
      <Popover className="basis-auto grow-0 shrink-0 mx-2">
        <div
          onMouseOver={handleHover}
          onMouseLeave={() => setIsShown(false)}
          ref={containerRef}
          className="cursor-pointer hover:text-secondary-light"
        >
          {isShown && <Tooltip direction="left" tooltipTxt="Ajouter des amis au groupe privé" position={position} size="sm" />}
          <Popover.Button ref={popoverRef} className="focus:outline-none flex items-center">
            <AddMemberIcon />
          </Popover.Button>
        </div>
        <Portal>
          <Popover.Panel
            ref={panelRef}
            style={{
              position: popoverStrat,
              top: popoverY ?? 0,
              left: popoverX ?? 0,
            }}
            className="z-40 bg-primary border border-gray-800 w-[440px] rounded-md drop-shadow-lg animate-fade-in"
          >
            {({ close }) => <AddNewGroupPopup closePopover={close} currentMembersIds={currentMembersIds} groupId={groupId} />}
          </Popover.Panel>
        </Portal>
      </Popover>
    </>
  );
};

export default AddGroupMemberBtn;
