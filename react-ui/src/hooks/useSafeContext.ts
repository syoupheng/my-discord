import { Context, useContext } from "react";

const useSafeContext = <TContextValue>(ctx: Context<TContextValue>, message: string) => {
  const context = useContext(ctx);
  if (context === null) throw new Error(message);
  return context;
};

export default useSafeContext;
