import { FiLogOut } from "react-icons/fi";
import useLogout from "../../hooks/auth/useLogout";
import Spinner from "../shared/Spinner";
import SidebarItem from "./SidebarItem";

const LogoutButton = () => {
  const [logout, { loading }] = useLogout();
  return (
    <SidebarItem hoverVariant="green" tooltipTxt="Déconnexion" onClick={logout}>
      {loading ? <Spinner white /> : <FiLogOut size={23} />}
    </SidebarItem>
  );
};

export default LogoutButton;
