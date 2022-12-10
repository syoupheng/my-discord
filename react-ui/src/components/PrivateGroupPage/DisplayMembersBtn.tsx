import { MdPeopleAlt } from "react-icons/md";
import useIsMembersOpen from "../../hooks/private-groups/useIsMembersOpen";
import GroupNavBtn from "./GroupNavBtn";

const DisplayMembersBtn = () => {
  const [isMembersOpen, setIsMembersOpen] = useIsMembersOpen();
  return (
    <GroupNavBtn
      active={isMembersOpen}
      title={`${isMembersOpen ? "Masquer" : "Afficher"} la liste des membres`}
      onClick={() => setIsMembersOpen!(!isMembersOpen)}
    >
      <MdPeopleAlt size={24} />
    </GroupNavBtn>
  );
};

export default DisplayMembersBtn;
