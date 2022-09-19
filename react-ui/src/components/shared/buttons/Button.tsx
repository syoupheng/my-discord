import { ReactNode } from "react";

interface Props {
  children: ReactNode,
  type?: 'submit'
}

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="bg-blue hover:bg-blue-hov transition ease-in-out duration-150 text-white w-full rounded-sm h-11 text-[15.3px] cursor-pointer"
    >
      {children}
    </button>
  );
}
 
export default Button;