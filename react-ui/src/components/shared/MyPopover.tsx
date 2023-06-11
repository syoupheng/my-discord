import MyPopoverProvider, { usePopoverContext } from "@/providers/MyPopoverProvider";
import { Placement } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { ComponentProps, ElementType, MutableRefObject, ReactNode } from "react";
import Portal from "@/components/shared/Portal";

type Props = ComponentProps<"div"> & {
  placement?: Placement | undefined;
  offset?: number | undefined;
  shift?: boolean;
};

const MyPopover = ({ children, placement = "top-start", offset = 16, shift = false, ...props }: Props) => {
  return (
    <Popover {...props}>
      <MyPopoverProvider placement={placement} offsetSize={offset} applyShift={shift}>
        {children}
      </MyPopoverProvider>
    </Popover>
  );
};

MyPopover.Button = ({ children, as, ...props }: ComponentProps<"button"> & { as?: ElementType<any> }) => {
  const { reference } = usePopoverContext();
  return (
    <Popover.Button as={as} {...props} ref={reference}>
      {children}
    </Popover.Button>
  );
};

export type PopoverCloseFunction = (focusableElem?: HTMLElement | MutableRefObject<HTMLElement | null> | undefined) => void;

type PopoverPanelProps = Omit<ComponentProps<"div">, "children"> & {
  children: ((close: PopoverCloseFunction) => ReactNode) | ReactNode;
  staticPanel?: boolean;
};

MyPopover.Panel = ({ children, staticPanel = false, style, ...props }: PopoverPanelProps) => {
  const { floating, y, x, strategy } = usePopoverContext();
  const panelStyles = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
  };
  return (
    <Portal>
      <Popover.Panel static={staticPanel} {...props} ref={floating} style={{ ...style, ...panelStyles }}>
        {typeof children === "function" ? ({ close }) => <>{children(close)}</> : children}
      </Popover.Panel>
    </Portal>
  );
};

export default MyPopover;
