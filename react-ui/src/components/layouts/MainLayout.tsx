import { Link, Outlet } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import SidebarItem from "../SideBar/SidebarItem";
import { FaDiscord } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../../hooks/auth/useLogout";
import Spinner from "../shared/Spinner";

const MainLayout = () => {
  const [logout, { loading }] = useLogout();

  return (
    <div className="flex">
      <Sidebar className="bg-tertiary w-[72px] pt-1">
        <Link to="/channels/@me">
          <SidebarItem tooltipTxt="Messages privés" active>
            <FaDiscord size={30} />
          </SidebarItem>
        </Link>
        <SidebarItem tooltipTxt="Déconnexion" handleClick={logout}>
          {loading ? <Spinner white /> : <FiLogOut size={23} />}
        </SidebarItem>
      </Sidebar>
      <Outlet />
    </div>
  );
};

export default MainLayout;
