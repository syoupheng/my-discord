import Tooltip from "@/components/shared/Tooltip";
import useTooltip from "@/hooks/ui/useTooltip";

type Props = {
  nbMembers?: number | null;
  label: string;
}

const MessageItemLabel = ({ nbMembers = null, label }: Props) => {
  const { handleHover, setIsShown, containerRef, isShown, position } = useTooltip();

  return (
    <div className="whitespace-nowrap text-ellipsis overflow-hidden flex-auto min-w-0 max-w-[165px] group-hover:max-w-[140px]">
      <div
        onMouseOver={() => !!containerRef.current && containerRef.current?.offsetWidth >= 140 && handleHover()}
        onMouseLeave={() => setIsShown(false)}
        ref={containerRef}
        className="text-btw-base-sm whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {label}
      </div>
      {isShown && <Tooltip position={position} tooltipTxt={label} size="sm" />}
      {!!nbMembers && <div className="text-xs -mt-[2px]">{nbMembers} membres</div>}
    </div>
  );
};

export default MessageItemLabel;
