import { offset, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import useAuthUserCache from "../hooks/auth/useAuthUserCache";
import DiscordAvatar from "./shared/DiscordAvatar";
import Portal from "./shared/Portal";

const UserProfilePopover = () => {
  const authUser = useAuthUserCache();
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "top-start",
    strategy: "fixed",
    middleware: [offset(16)],
  });

  return (
    <Popover className="grow max-w-[120px]">
      <Popover.Button ref={reference} className="flex items-center rounded hover:bg-grey-hov cursor-pointer focus:outline-none w-full">
        <DiscordAvatar className="mr-2" />
        <div className="whitespace-nowrap overflow-hidden text-btw-sm-xs">
          <div className="text-white font-bold">{authUser?.username}</div>
          <div className="text-h-secondary text-left">#{authUser?.id}</div>
        </div>
      </Popover.Button>
      <Portal>
        <Popover.Panel
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
          className="z-50 bg-secondary-alt rounded-md shadow-2xl"
        >
          <div className="bg-red h-16 mb-8 min-w-[335px] rounded-t-md relative"></div>
          <div className="p-4">
            <div className="bg-tertiary rounded-md p-3 first:pt-0">
              <div className="text-xl font-bold py-3">
                <span className="text-white">{authUser?.username}</span>
                <span className="text-h-secondary">#{authUser?.id}</span>
              </div>
              <div className="border-t border-grey-border py-3">
                <div className="text-white uppercase font-bold text-xs mb-2">Membre Discord depuis</div>
                <div className="text-secondary-light text-btw-sm-xs">févr. 02, 2021</div>
              </div>
              <div className="border-t border-grey-border py-3">
                <div className="text-white uppercase font-bold text-xs mb-2">Membre Discord depuis</div>
                <div className="text-secondary-light text-btw-sm-xs">févr. 02, 2021</div>
              </div>
              <div className="border-t border-grey-border py-3">
                <div className="text-white uppercase font-bold text-xs mb-2">Membre Discord depuis</div>
                <div className="text-secondary-light text-btw-sm-xs">févr. 02, 2021</div>
              </div>
              <div className="border-t border-grey-border py-3">
                <div className="text-white uppercase font-bold text-xs mb-2">Membre Discord depuis</div>
                <div className="text-secondary-light text-btw-sm-xs">févr. 02, 2021</div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Portal>
    </Popover>
  );
};

export default UserProfilePopover;
