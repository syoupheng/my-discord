import AddMemberIcon from "@/components/Icons/AddMemberIcon";
import MyPopover from "@/components/shared/MyPopover";
import PopoverLoadingFallback from "@/components/shared/PopoverLoadingFallback";
import TooltipWrapper from "@/components/shared/TooltipWrapper";
import { Suspense, lazy } from "react";

type Props = {
  currentMembersIds: (number | undefined)[];
  groupId?: number | null;
};

const AddNewGroupPopup = lazy(() => import("@/components/privateGroups/AddNewGroupPopup"));

const AddGroupMemberBtn = ({ currentMembersIds, groupId = null }: Props) => {
  return (
    <MyPopover placement="bottom-end" offset={5} className="basis-auto grow-0 shrink-0 mx-2">
      <TooltipWrapper tooltipTxt="Ajouter des amis au groupe privé" size="sm" direction="left" className="cursor-pointer hover:text-secondary-light">
        <MyPopover.Button className="focus:outline-none flex items-center">
          <AddMemberIcon />
        </MyPopover.Button>
      </TooltipWrapper>
      <MyPopover.Panel className="z-40 bg-primary border border-gray-800 w-[440px] rounded-md drop-shadow-lg animate-fade-in">
        {(close) => (
          <Suspense fallback={<PopoverLoadingFallback style={{ height: "400px" }} />}>
            <AddNewGroupPopup closePopover={close} currentMembersIds={currentMembersIds} groupId={groupId} />
          </Suspense>
        )}
      </MyPopover.Panel>
    </MyPopover>
  );
};

export default AddGroupMemberBtn;
