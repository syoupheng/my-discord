import { FaDiscord } from "react-icons/fa";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <FaDiscord size={80} className="text-white mx-auto animate-alt-spin mb-10" />
      <h3 className="uppercase text-xs text-white font-medium mb-4">Le savais-tu</h3>
      <p className="text-center text-btw-base-sm text-secondary-light max-w-md">
        Si tu viens juste de créer un compte tu peux tout de même discuter avec les amis qui apparaissent à gauche de ton écran.
      </p>
    </div>
  );
};

export default LoadingScreen;
