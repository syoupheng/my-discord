import TooltipWrapper from "@/components/shared/TooltipWrapper";
import { MouseEventHandler, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  label: string;
  action: MouseEventHandler<HTMLDivElement>;
}

const MessageButton = ({ label, children, action }: Props) => {
  return (
    <div className="flex items-center justify-center h-full p-1 w-8 cursor-pointer relative text-h-secondary hover:text-secondary-light hover:bg-mod-hov">
      <TooltipWrapper className="h-full" tooltipTxt={label} size="sm">
        <div className="h-full flex items-center" onClick={action} role="button" aria-label={label}>
          {children}
        </div>
      </TooltipWrapper>
    </div>
  );
};

export default MessageButton;
