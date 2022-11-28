import { offset, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { useParams } from "react-router-dom";
import AddMemberIcon from "../components/Icons/AddMemberIcon";
import ArobasIcon from "../components/Icons/ArobasIcon";
import AddNewGroupPopup from "../components/privateGroups/AddNewGroupPopup";
import Portal from "../components/shared/Portal";
import Tooltip from "../components/shared/Tooltip";
import UserStatusIcon from "../components/shared/UserStatusIcon";
import useAuthUser from "../hooks/auth/useAuthUser";
import useTooltip from "../hooks/ui/useTooltip";
import { UserStatus } from "../types/user";

const PrivateConversationPage = () => {
  const { data } = useAuthUser();
  const { conversationId } = useParams();
  if (!data) return null;
  const { friends, privateConversations } = data.me;
  const conversation = conversationId ? privateConversations.find((conv) => conv.id === parseInt(conversationId)) : undefined;
  const friendData = friends.find((friend) => friend.id === conversation?.member.id);
  const userStatus: UserStatus = friendData?.status ?? "INVISIBLE";

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
    <div className="min-h-0 min-w-0 flex relative flex-col overflow-hidden flex-auto">
      <section className="basis-auto shrink-0 grow-0 relative flex items-center min-w-0 w-full h-12 px-2 cursor-default border-b border-tertiary">
        <div className="relative flex-auto flex items-center min-w-0 overflow-hidden">
          <div className="mx-2 h-6 w-auto basis-auto grow-0 shrink-0 text-channels-default">
            <ArobasIcon />
          </div>
          <div className="mr-2 shrink-0 grow-0 basis-auto">
            <h1 className="cursor-pointer whitespace-nowrap overflow-hidden flex justify-start items-center text-white font-medium text-[17px] leading-[22px]">
              {conversation?.member.username}
            </h1>
          </div>
          <div className="basis-auto shrink-0 grow-0 mr-2 flex items-center">
            <UserStatusIcon status={userStatus} size={10} />
          </div>
        </div>
        <div className="flex items-center basis-auto shrink-0 grow-0 min-w-0 text-h-secondary">
          {!!friendData && (
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
                  {({ close }) => <AddNewGroupPopup closePopover={close} currentMembersIds={[conversation?.member.id]} />}
                </Popover.Panel>
              </Portal>
            </Popover>
          )}
        </div>
      </section>
    </div>
  );
};

export default PrivateConversationPage;
