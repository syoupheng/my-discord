import { MouseEventHandler, PropsWithChildren } from "react";
import clsx from "clsx";
import TooltipWrapper from "@/components/shared/TooltipWrapper";

type Props = PropsWithChildren & {
  title: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
};

const GroupNavBtn = ({ children, title, onClick, active = false }: Props) => {
  return (
    <div onClick={onClick} className={clsx(active && "text-white", "mx-2 basis-auto grow-0 shrink-0 cursor-pointer hover:text-secondary-light")}>
      <TooltipWrapper tooltipTxt={title} direction="left" size="sm">
        {children}
      </TooltipWrapper>
    </div>
  );
};

export default GroupNavBtn;
