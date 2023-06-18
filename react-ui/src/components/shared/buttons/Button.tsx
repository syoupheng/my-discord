import clsx from "clsx";
import { ComponentProps } from "react";

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

export type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  fullWidth?: boolean;
};

const Button = ({ children, className, disabled = false, variant = "blue", fullWidth = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        className,
        "focus:outline-none flex justify-center items-center border-0 transition ease-in-out duration-150 text-white rounded-[3px] py-2 px-4",
        disabled ? "cursor-not-allowed opacity-50" : `${variantMap[variant].hover} cursor-pointer`,
        variantMap[variant].color,
        fullWidth && "w-full"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
