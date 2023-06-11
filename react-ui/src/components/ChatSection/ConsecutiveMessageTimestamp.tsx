import { formatTimestamp } from "@/utils/dates";

type Props = {
  timestamp: string;
};

const ConsecutiveMessageTimestamp = ({ timestamp }: Props) => {
  return (
    <span className="absolute left-0 h-[1.375rem] leading-[1.375rem] w-14 select-none text-right z-[1] text-[0.6875rem] mr-1 indent-0 text-muted opacity-0 group-hover:opacity-100 inline-block cursor-default pointer-events-none font-medium">
      {formatTimestamp(timestamp)}
    </span>
  );
};

export default ConsecutiveMessageTimestamp;
