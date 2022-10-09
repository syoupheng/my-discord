import { FaDiscord } from "react-icons/fa";

interface Props {
  className?: string;
}

const DiscordAvatar = ({ className }: Props) => {
  return (
    <div
      className={`text-white rounded-full p-[5px] bg-red aspect-square ${className}`}
    >
      <FaDiscord size={22} />
      {/* <rect
        width="10"
        height="10"
        x="22"
        y="22"
        fill="hsl(214, calc(var(--saturation-factor, 1) * 9.9%), 50.4%)"
        mask="url(#svg-mask-status-offline)"
      ></rect> */}
    </div>
  );
};

export default DiscordAvatar;
