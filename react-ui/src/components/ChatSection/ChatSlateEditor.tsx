import { useCallback, useEffect } from "react";
import { BaseRange, Editor, NodeEntry, Transforms } from "slate";
import { Editable, RenderLeafProps, useSlate } from "slate-react";
import MentionElement from "./MentionElement";
import SlateLeaf from "./SlateLeaf";
import { usePrivateChannelContext } from "../../providers/PrivateChannelProvider";

interface Props {
  decorate: ((entry: NodeEntry<any>) => BaseRange[]) | undefined;
  slateValue: any[];
  handleKeyDown: (event: any) => void;
}

const ChatSlateEditor = ({ decorate, slateValue, handleKeyDown }: Props) => {
  const channel = usePrivateChannelContext();
  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateLeaf {...props} />, []);
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "mention":
        return <MentionElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const editor = useSlate();

  useEffect(() => {
    Transforms.select(editor, {
      anchor: Editor.start(editor, []),
      focus: Editor.start(editor, []),
    });
  }, []);

  return (
    <div
      className="bg-transparent p-0 text-btw-base-sm leading-[1.375rem] w-full min-h-[44px] text-secondary-light relative"
      style={{ height: (1 + slateValue.length) * 22 }}
    >
      {slateValue.length === 1 && slateValue[0].children.length === 1 && slateValue[0].children[0].text === "" && (
        <div className="py-[11px] pr-[10px] absolute left-0 right-[10px] whitespace-nowrap text-ellipsis overflow-hidden text-primary-dark-400 select-none pointer-events-none">
          {channel.placeholderContent}
        </div>
      )}
      <Editable
        onKeyDown={handleKeyDown}
        onSubmit={() => console.log("sub !")}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        spellCheck
        autoCorrect="off"
        autoFocus={true}
        className="outline-none break-words py-[11px] pr-[10px] absolute left-0 right-[10px] caret-secondary-light text-left select-text"
        style={{ whiteSpace: "break-spaces", wordBreak: "break-word" }}
      />
    </div>
  );
};

const DefaultElement = ({ attributes, children }: any) => {
  return <div {...attributes}>{children}</div>;
};

export default ChatSlateEditor;
