import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FormGroup = ({ children }: Props) => {
  return <div className="flex flex-col mb-5">{children}</div>;
};

export default FormGroup;
