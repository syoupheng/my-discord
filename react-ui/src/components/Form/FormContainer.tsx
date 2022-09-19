import { ReactNode } from "react";

interface Props {
  children: ReactNode
}

const FormContainer = ({ children }: Props) => {
  return <div className="bg-primary rounded-md p-8 sm:w-[480px] w-full sm:h-auto h-full">{children}</div>;
}
 
export default FormContainer;