import useSafeContext from "@/hooks/shared/useSafeContext";
import { Placement, ReferenceType, UseFloatingReturn, offset, useFloating, shift, Middleware } from "@floating-ui/react-dom";
import { createContext, PropsWithChildren } from "react";

export const MyPopoverContext = createContext<UseFloatingReturn<ReferenceType> | null>(null);

type Props = PropsWithChildren & {
  placement?: Placement | undefined;
  offsetSize?: number | undefined;
  applyShift: boolean;
};

const MyPopoverProvider = ({ children, placement, offsetSize, applyShift }: Props) => {
  const floatingMiddlewares: Middleware[] | undefined = [offset(offsetSize)];
  if (applyShift) floatingMiddlewares.push(shift());
  const popoverParams = useFloating({ placement, middleware: floatingMiddlewares });
  return <MyPopoverContext.Provider value={popoverParams}>{children}</MyPopoverContext.Provider>;
};

export const usePopoverContext = () => {
  return useSafeContext(MyPopoverContext, "usePopoverContext must be called inside MyPopoverProvider !");
};

export default MyPopoverProvider;
