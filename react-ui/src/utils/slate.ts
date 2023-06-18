import { Descendant, Editor, Range } from "slate";
import { CustomElement, MentionElement } from "@/types/slate";

export function findUrlsInText(text: string): Array<[t: string, y: number]>{
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches ? matches.map((m) => [m.trim(), text.indexOf(m.trim())]) : [];
};

function isElement(node: Descendant): node is CustomElement {
  return "children" in node;
}

export function isMentionElement(elem: CustomElement): elem is MentionElement {
  return elem.type === "mention"
}

export function serialize(value: Descendant[]) {
  return value
    .map((n) => {
      if (!isElement(n)) return n.text;
      const nodeTexts = n.children.map((child) => {
        if ("type" in child && child.type === "mention") {
          return `<@${child.tag.split("#")[1]}>`;
        } else if ("text" in child) {
          return child.text;
        }
        return "";
      });
      return nodeTexts.join("");
    })
    .join("\n");
};

export function getNodeInSelection(editor: Editor) {
  const { selection } = editor;
  if (!selection) return null;
  const [start] = Range.edges(selection);
  const [node] = Editor.nodes(editor, {
    at: start.path,
    match: n => Editor.isBlock(editor, n),
  });
  const nodePath = selection.focus.path;
  if (!node[0].children) return null;
  return node[0].children[nodePath[1]];
};
