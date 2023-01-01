interface Props {
  date: string;
}

const MessageDivider = ({ date }: Props) => {
  return (
    <div className="mt-6 mb-2 ml-4 mr-[0.875rem] relative left-auto right-auto z-[1] h-0 flex items-center justify-center pointer-events-none border-solid border-t border-t-background-modifier-accent">
      <span className="block grow-0 shrink-0 basis-auto py-[2px] px-1 bg-primary text-muted leading-[13px] text-xs mt-[-1px] font-semibold rounded-lg">
        {date}
      </span>
    </div>
  );
};

export default MessageDivider;
