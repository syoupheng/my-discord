import Button, { ButtonProps } from "./Button";

const ModalButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props} className="focus:outline-none min-w-[96px] min-h-[38px] h-10 w-auto text-sm py-[2px] px-4">
      {children}
    </Button>
  );
};

export default ModalButton;
