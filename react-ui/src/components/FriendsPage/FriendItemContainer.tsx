import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick: (params: any) => any;
}

const FriendItemContainer = ({ children, onClick }: Props) => {
  return (
    <div onClick={onClick} className="flex h-[62px] ml-[30px] mr-5 font-medium cursor-pointer group">
      <span className="group-hover:bg-mod-hov h-full w-2 rounded-l-lg bg-transparent"></span>
      <div className="flex grow items-center max-w-full justify-between border-t border-t-grey-border hover:border-t-transparent group-hover:bg-mod-hov">
        {children}
      </div>
      <span className="group-hover:bg-mod-hov h-full w-2 rounded-r-lg bg-transparent"></span>
    </div>
  );
};

export default FriendItemContainer;
