import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type CustomElement = { type: "paragraph"; children: CustomText[] };
export type CustomText = { text: string; decoration?: string };

declare module "slate" {
  export interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
