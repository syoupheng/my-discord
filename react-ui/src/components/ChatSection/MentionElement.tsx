import { ReactNode } from "react";

interface Props {
  attributes: any;
  children: ReactNode;
  element: any;
}

const MentionElement = ({ attributes, children, element }: Props) => {
  return (
    <span
      role="button"
      className="pb-[1px] rounded-[3px] px-[2px] font-medium text-brand-260 bg-mention-bg cursor-default inline-block"
      {...attributes}
      contentEditable={false}
    >
      <span tabIndex={0}>
        <span tabIndex={-1} style={{ unicodeBidi: "plaintext" }}>
          @{element.tag.split("#")[0]}
        </span>
      </span>
      {children}
    </span>
  );
};

export default MentionElement;
