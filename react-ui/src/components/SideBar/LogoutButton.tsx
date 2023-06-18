import SidebarItem from "@/components/SideBar/SidebarItem";
import Spinner from "@/components/shared/Spinner";
import useLogout from "@/hooks/auth/useLogout";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const [logout, { loading }] = useLogout();
  return (
    <SidebarItem hoverVariant="green" tooltipTxt="Déconnexion" onClick={logout}>
      {loading ? <Spinner white /> : <FiLogOut size={23} />}
    </SidebarItem>
  );
};

export default LogoutButton;
