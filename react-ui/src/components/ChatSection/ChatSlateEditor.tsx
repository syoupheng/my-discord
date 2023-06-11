import { PropsWithChildren, useCallback, useEffect } from "react";
import { BaseRange, Descendant, Editor, NodeEntry, Transforms } from "slate";
import { Editable, RenderLeafProps, useSlate } from "slate-react";
import { CustomElement, MentionElement as TMentionElement } from "@/types/slate";
import { isMentionElement } from "@/utils/slate";
import { usePrivateChannelContext } from "@/providers/PrivateChannelProvider";
import SlateLeaf from "@/components/ChatSection/SlateLeaf";
import MentionElement from "@/components/ChatSection/MentionElement";

type Props = {
  decorate: ((entry: NodeEntry<any>) => BaseRange[]) | undefined;
  slateValue: Descendant[];
  handleKeyDown: (event: any) => void;
  isEmpty: boolean;
};

const ChatSlateEditor = ({ decorate, slateValue, handleKeyDown, isEmpty }: Props) => {
  const channel = usePrivateChannelContext();
  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateLeaf {...props} />, []);
  const renderElement = useCallback((props: { element: CustomElement; attributes: any}) => {
    if (isMentionElement(props.element)) {
      return <MentionElement {...props as {element: TMentionElement; attributes: any}} />
    } else {
      return <DefaultElement {...props} />
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
      {isEmpty && (
        <div className="py-[11px] pr-[10px] absolute left-0 right-[10px] whitespace-nowrap text-ellipsis overflow-hidden text-primary-dark-400 select-none pointer-events-none">
          {channel.placeholderContent}
        </div>
      )}
      <Editable
        onKeyDown={handleKeyDown}
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

const DefaultElement = ({ attributes, children }: PropsWithChildren & { attributes: any }) => {
  return <div {...attributes}>{children}</div>;
};

export default ChatSlateEditor;
