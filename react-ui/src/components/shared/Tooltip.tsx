interface Props {
  className?: string;
  tooltipTxt: string;
  groupHover?: boolean;
}

const Tooltip = ({ className, tooltipTxt, groupHover = true }: Props) => {
  return (
    <span
      className={`${className} ${
        groupHover ? "group-hover:scale-100" : "tooltip"
      } absolute w-auto p-2 m-2 min-w-max rounded-md shadow-md text-white bg-tertiary font-bold transition-all duration-100 scale-0`}
    >
      {tooltipTxt}
    </span>
  );
};

export default Tooltip;
