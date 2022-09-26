import { ReactNode } from "react";

interface Props {
  children: ReactNode,
  animate?: boolean
}

const FormContainer = ({ children, animate = true }: Props) => {
  return <div className={`bg-primary rounded-md p-8 sm:w-[480px] w-full sm:h-auto h-full shadow-xl ${animate && 'animate-drop'}`}>{children}</div>;
}
 
export default FormContainer;