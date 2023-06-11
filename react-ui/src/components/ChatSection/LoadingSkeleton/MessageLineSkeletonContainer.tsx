import { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  header?: boolean;
}

const MessageLineSkeletonContainer = ({ children, header = false }: Props) => {
  return (
    <div
      className={`${header ? "mt-4" : ""} pl-[4.5rem] pr-4 bg-primary relative select-text overflow-hidden`}
      style={{ wordWrap: "break-word", contain: "paint layout" }}
    >
      <div>{children}</div>
    </div>
  );
};

export default MessageLineSkeletonContainer;
