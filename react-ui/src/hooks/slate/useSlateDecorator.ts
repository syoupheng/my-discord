import { findUrlsInText } from "@/utils/slate";
import { useCallback } from "react";
import { NodeEntry } from "slate";

const useSlateDecorator = () => {
  const slateDecorator = useCallback(
    ([node, path]: NodeEntry<{ text: string }>) => {
      const nodeText: string = node.text ?? "";
      const urls = findUrlsInText(nodeText);
      return urls.length > 0
        ? urls.map(([url, index]) => ({
            anchor: {
              path,
              offset: index,
            },
            focus: {
              path,
              offset: index + url.length,
            },
            decoration: "link",
          }))
        : [];
    },
    []
  );

  return slateDecorator;
};

export default useSlateDecorator;
