interface Props {
  show?: boolean;
  white?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string
}

const sizes = {
  sm: "1.75",
  md: "2",
  lg: "3.5",
};

const Spinner = ({ show = true, white = false, size = "md", className = '' }: Props) => {
  return show ? (
    <div
      className={`border-4 ${
        white ? "border-white" : "border-blue"
      } rounded-full border-t-transparent animate-spin mx-auto ${className}`}
      style={{
        height: `${sizes[size]}rem`,
        width: `${sizes[size]}rem`
      }}
    ></div>
  ) : null;
};

export default Spinner;
