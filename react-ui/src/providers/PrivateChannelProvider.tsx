import useSafeContext from "@/hooks/shared/useSafeContext";
import { ChannelModel } from "@/models/channel/channel-model.interface";
import { PropsWithChildren, createContext } from "react";

const privateChannelContext = createContext<ChannelModel | null>(null);

type Props = PropsWithChildren & {
  channel: ChannelModel;
};

const PrivateChannelProvider = ({ children, channel }: Props) => {
  return <privateChannelContext.Provider value={channel}>{children}</privateChannelContext.Provider>;
};

export const usePrivateChannelContext = () => useSafeContext(privateChannelContext, "This shoud be called inside of the PrivateChannelProvider !");

export default PrivateChannelProvider;
