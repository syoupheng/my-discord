import { MdPeopleAlt } from "react-icons/md";

interface Props {
  className?: string;
}

const GroupIcon = ({ className }: Props) => {
  return (
    <div className={`text-white rounded-full p-[5px] bg-positive aspect-square ${className} flex items-center justify-center`}>
      <MdPeopleAlt size={16} />
    </div>
  );
};

export default GroupIcon;
