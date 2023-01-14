import { offset, shift, useFloating } from "@floating-ui/react-dom";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import useEditProfile from "../../hooks/user/useEditProfile";
import { User, UserStatus } from "../../types/user";
import UserStatusIcon from "../shared/UserStatusIcon";

interface UserStatusMapValue {
  label: string;
  description: string;
}

const userStatusMap = new Map<UserStatus, UserStatusMapValue>([
  [
    "ONLINE",
    {
      label: "En ligne",
      description: "",
    },
  ],
  [
    "INACTIVE",
    {
      label: "Inactif",
      description: "",
    },
  ],
  [
    "DO_NOT_DISTURB",
    {
      label: "Ne pas déranger",
      description: "Tu ne recevras aucune notification sur le bureau.",
    },
  ],
  [
    "INVISIBLE",
    {
      label: "Invisible",
      description: "Tu n'apparaîtras pas connecté, mais tu auras néanmoins accès à toutes les fonctionnalités de Discord.",
    },
  ],
]);

interface Props {
  authUser: User;
  onClose: () => void;
}

const UserStatusSelection = ({ authUser, onClose }: Props) => {
  const [showSelect, setShowSelect] = useState(false);
  const [editProfile] = useEditProfile();

  const selectUserStatus = (userStatus: UserStatus) => {
    editProfile({ variables: { input: { status: userStatus } } });
    setShowSelect(false);
  };

  const {
    x: selectX,
    y: selectY,
    reference,
    floating: selectRef,
    strategy: selectStrat,
  } = useFloating({ placement: "right-start", middleware: [offset(-5), shift()] });

  return (
    <div ref={reference} className="border-t border-grey-border py-2">
      <div
        onMouseOver={() => setShowSelect(true)}
        onMouseLeave={() => setShowSelect(false)}
        className="flex justify-between text-h-secondary hover:text-white items-center hover:bg-blue p-2 rounded-sm cursor-pointer group"
      >
        <div className="flex items-center">
          <div className="mr-3">
            <UserStatusIcon status={authUser?.status} size={13} hoverWhite="group" />
          </div>
          <div className="text-btw-sm-xs">{userStatusMap.get(authUser?.status)?.label}</div>
        </div>
        <BiChevronRight size={20} />
        {showSelect && (
          <div
            ref={selectRef}
            style={{
              position: selectStrat,
              top: selectY ? selectY - 15 : 0,
              left: selectX ?? 0,
              width: "max-content",
            }}
            className="pl-6 bg-transparent cursor-default"
          >
            <div className="bg-tertiary rounded-sm p-2 z-50 shadow-2xl">
              <ul className="w-72">
                {[...userStatusMap].map(([userStatus, { label, description }]) => (
                  <li
                    key={userStatus}
                    onClick={() => {
                      selectUserStatus(userStatus);
                      onClose();
                    }}
                    className="first:border-b first:border-grey-border p-2 text-h-secondary hover:text-white hover:bg-blue first:mt-0 last:mb-0 my-1 cursor-pointer rounded-sm grid grid-cols-12 group/listitem"
                  >
                    <div className="col-span-1 my-auto">
                      <UserStatusIcon status={userStatus} size={10} hoverWhite="listitem" />
                    </div>
                    <div className="text-btw-sm-xs col-span-11">{label}</div>
                    {description !== "" && <p className="text-xxs mt-1 col-start-2 col-end-12">{description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatusSelection;
