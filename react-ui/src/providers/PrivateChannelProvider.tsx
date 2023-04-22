import { PropsWithChildren, createContext } from "react";
import useSafeContext from "../hooks/shared/useSafeContext";
import { ChannelModel } from "../models/channel-model.interface";

const privateChannelContext = createContext<ChannelModel | null>(null);

interface Props extends PropsWithChildren {
  channel: ChannelModel;
}

const PrivateChannelProvider = ({ children, channel }: Props) => {
  return <privateChannelContext.Provider value={channel}>{children}</privateChannelContext.Provider>;
};

export const usePrivateChannelContext = () => useSafeContext(privateChannelContext, "This shoud be called inside of the PrivateChannelProvider !");

export default PrivateChannelProvider;
