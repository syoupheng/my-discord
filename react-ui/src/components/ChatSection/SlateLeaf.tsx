import { RenderLeafProps } from "slate-react";

const SlateLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  return (
    <span {...attributes} className={`${leaf.decoration === "link" ? "text-link" : ""}`}>
      {children}
    </span>
  );
};

export default SlateLeaf;
