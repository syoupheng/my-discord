import { BaseEditor, Node } from "slate";
import { ReactEditor } from "slate-react";

export type ParagraphElement =  { type: "paragraph"; children: Node[] };
export type MentionElement = { type: "mention"; tag: string; children: Node[] }
export type CustomElement = ParagraphElement | MentionElement;
export type CustomText = { text: string; decoration?: string; children?: Node[] };

declare module "slate" {
  export interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
