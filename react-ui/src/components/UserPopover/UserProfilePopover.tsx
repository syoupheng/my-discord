import { offset, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import UserAvatar from "../shared/UserAvatar";
import Portal from "../shared/Portal";
import useAuthUser from "../../hooks/auth/useAuthUser";
import UserStatusSelection from "./UserStatusSelection";
import BigUserAvatar from "../shared/BigUserAvatar";

const UserProfilePopover = () => {
  const { data: authUser } = useAuthUser();

  const {
    x: popoverX,
    y: popoverY,
    reference: popoverRef,
    floating: panelRef,
    strategy: popoverStrat,
  } = useFloating({ placement: "top-start", middleware: [offset(16)] });

  if (!authUser) return null;

  return (
    <Popover className="grow max-w-[120px]">
      <Popover.Button ref={popoverRef} className="flex items-center rounded hover:bg-grey-hov cursor-pointer focus:outline-none w-full">
        <UserAvatar status={authUser.me.status} className="mr-2" />
        <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs">
          <div className="text-white font-bold">{authUser.me.username}</div>
          <div className="text-h-secondary text-left">#{authUser?.me.id}</div>
        </div>
      </Popover.Button>
      <Portal>
        <Popover.Panel
          ref={panelRef}
          style={{
            position: popoverStrat,
            top: popoverY ?? 0,
            left: popoverX ?? 0,
            width: "max-content",
          }}
          className="z-40 bg-secondary-alt rounded-md shadow-2xl animate-fade-in"
        >
          {({ close }) => (
            <div>
              <div className="bg-red h-14 mb-8 min-w-[335px] rounded-t-md relative">
                <div className="absolute bottom-0 left-4 translate-y-1/2">
                  <BigUserAvatar status={authUser.me.status} />
                </div>
              </div>
              <div className="p-4">
                <div className="bg-tertiary rounded-md px-3">
                  <div className="text-xl font-bold py-3">
                    <span className="text-white">{authUser.me.username}</span>
                    <span className="text-h-secondary">#{authUser.me.id}</span>
                  </div>
                  <div className="border-t border-grey-border pt-2">
                    <div className="my-1">
                      <div className="text-white uppercase font-bold text-xs mb-2">Membre Discord depuis</div>
                      <div className="text-secondary-light text-btw-sm-xs">févr. 02, 2021</div>
                    </div>
                    <UserStatusSelection onClose={close} authUser={authUser.me} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Portal>
    </Popover>
  );
};

export default UserProfilePopover;
