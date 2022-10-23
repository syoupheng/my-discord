import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  type?: "submit";
  disabled?: boolean;
  className?: string;
}

const Button = ({ children, className, disabled = false, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${
        disabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-hov cursor-pointer"
      } ${className} transition ease-in-out duration-150 text-white rounded-sm bg-blue flex justify-center items-center border-0`}
    >
      {children}
    </button>
  );
};

export default Button;
