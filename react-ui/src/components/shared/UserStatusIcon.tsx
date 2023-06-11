import { ReactNode } from "react";
import { UserStatus } from "@/gql/graphql";
import OnlineIcon from "@/components/Icons/OnlineIcon";
import InactiveIcon from "@/components/Icons/InactiveIcon";
import DoNotDisturbIcon from "@/components/Icons/DoNotDisturbIcon";
import InvisibleIcon from "@/components/Icons/InvisibleIcon";

type HoverWhiteValues = "listitem" | "group" | null;

type Props = {
  status: UserStatus;
  size?: number;
  hoverWhite?: HoverWhiteValues;
};

type UserStatusMapValue = {
  icon: ReactNode;
  color: string;
};

const userStatusMap = new Map<UserStatus, UserStatusMapValue>([
  [
    "ONLINE",
    {
      icon: <OnlineIcon />,
      color: "#3BA55D",
    },
  ],
  [
    "INACTIVE",
    {
      icon: <InactiveIcon />,
      color: "#FAA819",
    },
  ],
  [
    "DO_NOT_DISTURB",
    {
      icon: <DoNotDisturbIcon />,
      color: "#ED4043",
    },
  ],
  [
    "INVISIBLE",
    {
      icon: <InvisibleIcon />,
      color: "none",
    },
  ],
]);

const UserStatusIcon = ({ status, size = 24, hoverWhite = null }: Props) => {
  const { icon, color } = userStatusMap.get(status)!;

  const hoverClassesMap = new Map<HoverWhiteValues, string>([
    ["group", `group-hover:stroke-white ${status !== "INVISIBLE" ? "group-hover:fill-white" : ""}`],
    ["listitem", `group-hover/listitem:stroke-white ${status !== "INVISIBLE" ? "group-hover/listitem:fill-white" : ""}`],
  ]);

  return (
    <svg
      className={hoverWhite ? hoverClassesMap.get(hoverWhite) : ""}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={status === "INVISIBLE" ? "#737E8C" : ""}
      xmlns="http://www.w3.org/2000/svg"
    >
      {icon}
    </svg>
  );
};

export default UserStatusIcon;
