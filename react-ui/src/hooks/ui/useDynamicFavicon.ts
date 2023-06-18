import { useEffect } from "react";

const useDynamicFavicon = () => {
  useEffect(() => {
    const faviconLink = document.getElementById("favicon") as HTMLLinkElement;
    if (!faviconLink) return;
    faviconLink.href = "/discord-favicon-loggedin.svg";

    return () => {
      faviconLink.href = "/discord-favicon.svg";
    };
  }, []);
};

export default useDynamicFavicon;
