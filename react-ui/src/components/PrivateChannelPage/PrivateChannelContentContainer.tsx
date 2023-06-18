import { PropsWithChildren } from "react";

const PrivateChannelContentContainer = ({ children }: PropsWithChildren) => {
  return <div className="min-w-0 min-h-0 flex-auto flex items-stretch relative">{children}</div>;
};

export default PrivateChannelContentContainer;
