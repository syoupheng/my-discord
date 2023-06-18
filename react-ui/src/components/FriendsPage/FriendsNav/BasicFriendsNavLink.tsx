import FriendsNavlink from "@/components/FriendsPage/FriendsNav/FriendsNavlink";
import { FriendsTabValue } from "@/providers/FriendsTabProvider";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  tab: FriendsTabValue;
};

const BasicFriendsNavLink = ({ tab, children }: Props) => {
  return (
    <FriendsNavlink tab={tab} className="hover:bg-mod-hov" activeStyles="bg-grey-selected text-white" nonActiveStyles="hover:text-secondary-light">
      {children}
    </FriendsNavlink>
  );
};

export default BasicFriendsNavLink;
