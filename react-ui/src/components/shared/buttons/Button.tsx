import { ReactNode } from "react";

interface Props {
  children: ReactNode,
  type?: 'submit',
  disabled?: boolean
}

const Button = ({ children, disabled = false, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${disabled ? 'bg-h-secondary cursor-not-allowed' : 'bg-blue hover:bg-blue-hov cursor-pointer'} transition ease-in-out duration-150 text-white w-full rounded-sm h-11 text-[15.3px]`}
    >
      {children}
    </button>
  );
}
 
export default Button;