import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Outlet />
      <Toaster toastOptions={{ className: 'bg-secondary-alt text-secondary-light' }} />
    </div>
  );
};

export default App;
