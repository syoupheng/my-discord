export const findUrlsInText = (text: string): Array<[t: string, y: number]> => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches ? matches.map((m) => [m.trim(), text.indexOf(m.trim())]) : [];
};

export const serialize = (value: any[]) => {
  return value
    .map((n) => {
      const nodeTexts = n.children.map((child: any) => (child.type === "mention" ? `<@${child.tag.split("#")[1]}>` : child.text));
      return nodeTexts.join("");
    })
    .join("\n");
};
