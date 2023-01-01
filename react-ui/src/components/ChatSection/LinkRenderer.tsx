import { Fragment } from "react";
import CustomLink from "./CustomLink";
import MentionRenderer from "./MentionRenderer";

interface Props {
  content: string;
}

const LinkRenderer = ({ content }: Props) => {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  return (
    <>
      {content.split(new RegExp(urlRegex, "g")).map((part, idx) => (
        <Fragment key={idx}>{part.match(urlRegex) ? <CustomLink href={part} /> : <MentionRenderer content={part} />}</Fragment>
      ))}
    </>
  );
};

export default LinkRenderer;
