import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen w-screen overflow-auto">
      <img
        className="fixed top-0 left-0 h-full w-full"
        src="./background.svg"
      />
      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}
 
export default AuthLayout;