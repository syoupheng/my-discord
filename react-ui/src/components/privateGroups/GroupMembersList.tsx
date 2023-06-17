import NoResultsIcon from "@/components/Icons/NoResultsIcon";
import ValidateIcon from "@/components/Icons/ValidateIcon";
import UserAvatar from "@/components/shared/UserAvatar";
import { FriendFragment } from "@/gql/graphql";
import { forwardRef } from "react";

type Props = {
  filterFriends: FriendFragment[];
  handleClick: (id: number) => void;
  hoveredIndex?: number;
  handleHover: (idx: number) => void;
  isSelected: (id: number) => boolean;
};

const GroupMembersList = forwardRef<HTMLDivElement, Props>(
  ({ filterFriends, handleClick, hoveredIndex = 0, handleHover, isSelected }, friendListRef) => {
    if (filterFriends.length === 0)
      return (
        <div className="flex-auto text-primary-dark-400 px-12 text-center mb-5 max-h-48 text-btw-base-sm flex flex-col flex-nowrap justify-center">
          <div className="mb-5 mx-auto">
            <NoResultsIcon />
          </div>
          <div>Aucun ami trouvé n'étant pas déjà dans ce groupe privé.</div>
        </div>
      );

    return (
      <div ref={friendListRef} className="overflow-x-hidden overflow-y-scroll max-h-[190px] relative flex-auto min-h-0">
        {filterFriends.map(({ status, username, id, avatarColor, discriminator }, idx) => (
          <div onClick={() => handleClick(id)} key={id} className="cursor-pointer py-[1px] mr-1 ml-3" onMouseOver={() => handleHover(idx)}>
            <div
              className={`${
                hoveredIndex === idx && "bg-primary-dark-500"
              } rounded-[3px] h-10 py-[6px] px-2 whitespace-nowrap text-ellipsis overflow-hidden flex items-center justify-start flex-nowrap`}
            >
              <UserAvatar avatarColor={avatarColor} status={status} />
              <div className="flex-auto whitespace-nowrap text-ellipsis overflow-hidden mx-[10px] flex flex-nowrap justify-start items-baseline">
                <strong className="mr-1 text-sm text-secondary-light font-normal">{username}</strong>
                <div
                  className={`${
                    hoveredIndex === idx ? "text-secondary-light" : "text-h-secondary"
                  } opacity-50 flex justify-start items-center overflow-hidden leading-[1.1] text-sm font-medium`}
                >
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap flex-initial">{username}</span>
                  <span>#{discriminator}</span>
                </div>
              </div>
              <span className="flex shrink-0 grow-0 basis-auto items-center relative max-w-full">
                <div
                  className={`${
                    isSelected(id) ? "border-grey-hov" : "border-primary-dark-400"
                  } h-[22px] w-[22px] shrink-0 grow-0 basis-auto border rounded-md flex items-center justify-center text-grey-hov`}
                >
                  {isSelected(id) && <ValidateIcon size={18} />}
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

export default GroupMembersList;
