type Props = {
  count: number;
};

const NotificationCounter = ({ count }: Props) => {
  return (
    <div className={`bg-red rounded-full h-4 w-4 text-white flex items-center justify-center font-semibold text-xs basis-auto grow-0 shrink-0`}>
      {count}
    </div>
  );
};

export default NotificationCounter;
