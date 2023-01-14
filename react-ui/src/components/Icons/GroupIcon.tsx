import { MdPeopleAlt } from "react-icons/md";

type AvatarSize = "lg" | "md" | "sm";

interface Props {
  className?: string;
  size?: AvatarSize;
}

interface SizeValues {
  iconSize: number;
  circleSize: string;
}

const SizeMap = new Map<AvatarSize, SizeValues>([
  ["sm", { iconSize: 16, circleSize: "32px" }],
  ["lg", { iconSize: 40, circleSize: "80px" }],
]);

const GroupIcon = ({ className, size = "sm" }: Props) => {
  return (
    <div
      className={`text-white rounded-full p-[5px] bg-positive aspect-square ${className} flex items-center justify-center`}
      style={{ height: SizeMap.get(size)?.circleSize, width: SizeMap.get(size)?.circleSize }}
    >
      <MdPeopleAlt size={SizeMap.get(size)?.iconSize} />
    </div>
  );
};

export default GroupIcon;
