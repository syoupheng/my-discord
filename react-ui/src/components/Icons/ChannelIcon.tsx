import { IconType } from "react-icons";
import { MdPeopleAlt } from "react-icons/md";
import { ChannelType } from "../../models/channel-model.interface";
import { FaDiscord } from "react-icons/fa";

type AvatarSize = "lg" | "md" | "sm";

interface Props {
  className?: string;
  size?: AvatarSize;
  channelType?: "group" | "conversation";
  avatarColor?: string;
}

interface SizeValues {
  iconSize: number;
  circleSize: string;
}

const SizeMap = new Map<AvatarSize, SizeValues>([
  ["sm", { iconSize: 16, circleSize: "32px" }],
  ["lg", { iconSize: 40, circleSize: "80px" }],
]);

const IconMap = new Map<ChannelType, IconType>([
  ["group", MdPeopleAlt],
  ["conversation", FaDiscord],
]);

// const ColorMap = new Map<ChannelType, string>([
//   ["group", "bg-positive"],
//   ["conversation", "bg-red"],
// ]);

const ChannelIcon = ({ className, size = "sm", channelType = "conversation", avatarColor = "#ef4444" }: Props) => {
  const sizeValue = SizeMap.get(size)?.circleSize;
  const Icon = IconMap.get(channelType) ?? MdPeopleAlt;
  return (
    <div
      className={`text-white rounded-full p-[5px] aspect-square ${className} flex items-center justify-center`}
      style={{ height: sizeValue, width: sizeValue, backgroundColor: avatarColor }}
    >
      <Icon size={SizeMap.get(size)?.iconSize} />
    </div>
  );
};

export default ChannelIcon;
