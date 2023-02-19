import ChatContent from "../components/ChatSection/ChatContent";
import MembersSidebar from "../components/PrivateGroupPage/MembersSidebar";
import PrivateGroupNav from "../components/PrivateGroupPage/PrivateGroupNav";
import useFindGroup from "../hooks/private-groups/useFindGroup";
import useDocumentTitle from "../hooks/ui/useDocumentTitle";
import DisplayGroupMembersProvider from "../providers/DisplayGroupMembersProvider";

const PrivateGroupPage = () => {
  const group = useFindGroup();
  if (!group) return null;
  useDocumentTitle(group.name);
  return (
    <DisplayGroupMembersProvider>
      <div className="min-h-0 min-w-0 flex relative flex-col overflow-hidden flex-auto">
        <PrivateGroupNav group={group} />
        <div className="min-w-0 min-h-0 flex-auto flex items-stretch relative">
          <ChatContent />
          <MembersSidebar members={group.members} />
        </div>
      </div>
    </DisplayGroupMembersProvider>
  );
};

export default PrivateGroupPage;
