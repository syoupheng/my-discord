import { Reference } from "@apollo/client";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";
import { InputMaybe, Message } from "../gql/graphql";

// export const offsetFromCursor = (items: Message[], cursor: InputMaybe<string> | undefined, readField: ReadFieldFunction) => {
//   for (let i = items.length - 1; i >= 0; i--) {
//     const item = items[i];
//     if (readField("createdAt", item) === cursor) return i + 1;
//   }
//   return -1;
// };

export const messagesMerger = (
  exisiting: { cursor: string; messages: Record<number, Reference> },
  incoming: { cursor: string; messages: Reference[] },
  { readField }: { readField: ReadFieldFunction }
) => {
  // const merged = exisiting ? exisiting.slice(0) : [];
  // console.log({ exisiting });
  // console.log({ incoming });
  // let offset = offsetFromCursor(merged, cursor, readField);
  // if (offset < 0) offset = merged.length;
  // for (let i = 0; i < incoming.length; i++) {
  //   merged[offset + i] = incoming[i];
  // }
  // return merged;
  const messages = exisiting ? { ...exisiting.messages } : {};
  incoming.messages.forEach((message) => {
    messages[readField("id", message) as number] = message;
  });
  return { cursor: incoming.cursor, messages };
};
