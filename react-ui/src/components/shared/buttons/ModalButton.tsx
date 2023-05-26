import Button, { ButtonProps } from "./Button";

const ModalButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button {...props} className="text-sm">
      {children}
    </Button>
  );
};

export default ModalButton;
