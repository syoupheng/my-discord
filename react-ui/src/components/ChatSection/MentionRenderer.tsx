import { Fragment } from "react";
import MentionMarkup from "./MentionMarkup";

interface Props {
  content: string;
}

const MentionRenderer = ({ content }: Props) => {
  const mentionRegex = /(<@[1-9]\d*>)/;
  return (
    <>
      {content.split(new RegExp(mentionRegex, "g")).map((part, idx) => (
        <Fragment key={idx}>{part.match(mentionRegex) ? <MentionMarkup mentionId={parseInt(part.slice(2, -1))} /> : part}</Fragment>
      ))}
    </>
  );
};

export default MentionRenderer;
