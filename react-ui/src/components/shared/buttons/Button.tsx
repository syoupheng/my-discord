import { ReactNode } from "react";

type Variant = "red" | "blue" | "transparent";

const variantMap: Record<Variant, { color: string; hover: string }> = {
  blue: {
    color: "bg-blue",
    hover: "hover:bg-blue-hov",
  },
  red: {
    color: "bg-btn-danger",
    hover: "hover:bg-btn-danger-hov",
  },
  transparent: {
    color: "bg-transparent",
    hover: "hover:underline",
  },
};

export interface ButtonProps {
  children: ReactNode;
  type?: "submit";
  disabled?: boolean;
  className?: string;
  variant?: Variant;
  onClick?: any;
}

const Button = ({ children, className, disabled = false, variant = "blue", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`${
        disabled ? "cursor-not-allowed opacity-50" : variantMap[variant].hover + " cursor-pointer"
      } ${className} transition ease-in-out duration-150 text-white rounded-[3px] ${
        variantMap[variant].color
      } flex justify-center items-center border-0`}
    >
      {children}
    </button>
  );
};

export default Button;
