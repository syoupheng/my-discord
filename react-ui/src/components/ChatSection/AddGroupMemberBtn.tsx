import AddMemberIcon from "@/components/Icons/AddMemberIcon";
import AddNewGroupPopup from "@/components/privateGroups/AddNewGroupPopup";
import MyPopover from "@/components/shared/MyPopover";
import TooltipWrapper from "@/components/shared/TooltipWrapper";

type Props = {
  currentMembersIds: (number | undefined)[];
  groupId?: number | null;
}

const AddGroupMemberBtn = ({ currentMembersIds, groupId = null }: Props) => {
  return (
    <MyPopover placement="bottom-end" offset={5} className="basis-auto grow-0 shrink-0 mx-2">
      <TooltipWrapper tooltipTxt="Ajouter des amis au groupe privé" size="sm" direction="left" className="cursor-pointer hover:text-secondary-light">
        <MyPopover.Button className="focus:outline-none flex items-center">
          <AddMemberIcon />
        </MyPopover.Button>
      </TooltipWrapper>
        <MyPopover.Panel className="z-40 bg-primary border border-gray-800 w-[440px] rounded-md drop-shadow-lg animate-fade-in">
          {(close) => <AddNewGroupPopup closePopover={close} currentMembersIds={currentMembersIds} groupId={groupId} />}
        </MyPopover.Panel>
    </MyPopover>
  );
};

export default AddGroupMemberBtn;
