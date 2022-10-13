import { ReactNode, useRef, useState } from "react";
import Portal from "../shared/Portal";
import Tooltip from "../shared/Tooltip";

interface Props {
  icon: ReactNode;
  description?: string;
}

const FriendActionBtn = ({ icon, description = "" }: Props) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isShown, setIsShown] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        left: rect.x + rect.width / 4,
        top: rect.y - 45 + window.scrollY,
      });
      setIsShown(true);
    }
  };

  return (
    <div
      onMouseOver={handleHover}
      onMouseLeave={() => setIsShown(false)}
      ref={buttonRef}
      className="cursor-pointer h-9 w-9 rounded-full text-h-secondary bg-secondary flex items-center justify-center relative mp-btn group-hover:bg-tertiary hover:text-secondary-light ml-2 first:ml-0"
    >
      {icon}
      {isShown && (
        <Portal>
          <span
            className={`absolute w-auto p-2 m-2 min-w-max rounded-md shadow-md text-white bg-tertiary font-bold text-xs origin-left animate-tooltip`}
            style={{
              left: position.left,
              top: position.top,
              transform: "translateX(-50%)",
            }}
          >
            {description}
          </span>
          {/* <Tooltip
          tooltipTxt={description}
          className={`${isFirst ? "-bottom-12 z-30" : "origin-top -top-12"} text-xs`}
          groupHover={false}
        /> */}
        </Portal>
      )}
    </div>
  );
};

export default FriendActionBtn;
