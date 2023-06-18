import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  animate?: boolean;
  shadow?: boolean;
};

const FormContainer = ({ children, animate = true, shadow = true }: Props) => {
  return (
    <div className={`bg-primary rounded-md p-8 sm:w-[480px] w-full sm:h-auto h-full ${shadow && "shadow-xl"} ${animate && "animate-drop"}`}>
      {children}
    </div>
  );
};

export default FormContainer;
