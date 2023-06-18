import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { ComponentProps, Fragment, PropsWithChildren, ReactNode, createContext, forwardRef } from "react";

type Props = ComponentProps<"div"> & {
  isOpen?: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type ModalContextValue = [boolean, (isOpen: boolean) => void];
const ModalContext = createContext<ModalContextValue | null>(null);

const ModalContextProvider = ({ isOpen = false, setIsOpen, children }: Pick<Props, "isOpen" | "setIsOpen"> & PropsWithChildren) => {
  return <ModalContext.Provider value={[isOpen, setIsOpen]}>{children}</ModalContext.Provider>;
};

const MyModal = ({ isOpen = false, setIsOpen, children }: Props) => {
  return (
    <ModalContextProvider isOpen={isOpen} setIsOpen={setIsOpen}>
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80" />
          </Transition.Child>

          <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100 "
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              {children}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </ModalContextProvider>
  );
};

MyModal.Panel = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ children, className, ...props }, ref) => (
  <Dialog.Panel ref={ref} className={`mx-auto rounded bg-primary ${className}`} {...props}>
    {children}
  </Dialog.Panel>
));

type ModalContentProps = PropsWithChildren & {
  title: string;
  centered?: boolean;
};

MyModal.Content = ({ title, children, centered = false }: ModalContentProps) => {
  return (
    <div className={clsx("px-4 pt-4 overflow-y-scroll overflow-x-hidden", centered && "text-center")}>
      <Dialog.Title className="text-white text-xl font-bold mb-3">{title}</Dialog.Title>
      <div className="mb-8 text-btw-base-sm text-secondary-light">{children}</div>
    </div>
  );
};

type ModalControlsProps = PropsWithChildren & {
  alignment?: Alignment;
};

type Alignment = "center" | "left" | "right";

const Alignment: Record<Alignment, string> = {
  center: "justify-center",
  left: "justify-start",
  right: "justify-end",
};

MyModal.Controls = ({ children, alignment = "right" }: ModalControlsProps) => {
  return <div className={`p-4 flex bg-secondary rounded-b ${Alignment[alignment]}`}>{children}</div>;
};

export default MyModal;
