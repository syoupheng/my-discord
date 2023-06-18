import { offset, shift, useFloating } from "@floating-ui/react-dom";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { UserStatus } from "@/gql/graphql";
import { PopoverCloseFunction } from "@/components/shared/MyPopover";
import useEditProfile from "@/hooks/user/useEditProfile";
import UserStatusIcon from "@/components/shared/UserStatusIcon";
import StatusSelectionItem from "@/components/UserPopover/StatusSelectionItem";
import useAuthUserInfo from "@/hooks/auth/useAuthUserInfo";

type UserStatusMapValue = {
  label: string;
  description: string;
};

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

type Props = {
  userStatus: UserStatus;
  closePopover: PopoverCloseFunction;
};

const UserStatusSelection = ({ userStatus, closePopover }: Props) => {
  const [showSelect, setShowSelect] = useState(false);
  const [editProfile] = useEditProfile();
  const { id, username, phoneNumber } = useAuthUserInfo();

  const selectUserStatus = (userStatus: UserStatus) => {
    editProfile({
      variables: { input: { status: userStatus } },
      optimisticResponse: {
        editProfile: {
          __typename: "AuthUser",
          id,
          username,
          status: userStatus,
          phoneNumber,
        },
      },
    });
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
            <UserStatusIcon status={userStatus} size={13} hoverWhite="group" />
          </div>
          <div className="text-btw-sm-xs">{userStatusMap.get(userStatus)?.label}</div>
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
                  <StatusSelectionItem
                    key={userStatus}
                    onSelect={() => {
                      selectUserStatus(userStatus);
                      closePopover();
                    }}
                    userStatus={userStatus}
                    label={label}
                    description={description}
                  />
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
