import { MouseEventHandler, ReactNode } from "react";
import TooltipWrapper from "../shared/TooltipWrapper";

interface Props {
  label: string;
  children: ReactNode;
  action: MouseEventHandler<HTMLDivElement>;
}

const MessageButton = ({ label, children, action }: Props) => {
  return (
    <TooltipWrapper tooltipTxt={label} size="sm">
      <div
        onClick={action}
        className="flex items-center justify-center h-full p-1 min-w-[24px] cursor-pointer relative text-h-secondary hover:text-secondary-light hover:bg-mod-hov"
        role="button"
        aria-label={label}
      >
        {children}
      </div>
    </TooltipWrapper>
  );
};

export default MessageButton;
