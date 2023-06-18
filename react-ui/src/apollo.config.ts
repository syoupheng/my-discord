import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { onError } from "@apollo/client/link/error";
import { Reference, getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, HttpLink, InMemoryCache, from, split } from "@apollo/client";
import { toast } from "react-hot-toast";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";
import { getMillisecondsDiff } from "@/utils/dates";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL, credentials: "include" });

const wsLink = new GraphQLWsLink(createClient({ url: import.meta.env.VITE_SUBSCRIPTION_URL }));

const errorLink = onError(({ networkError }) => {
  if (networkError) {
    toast.error("Problème de connexion...", { id: "network-error" });
    throw new Error("Network error...");
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      AuthUser: {
        keyFields: [],
      },
      Query: {
        fields: {
          getMessages: {
            keyArgs: ["channelId"],
            // merge: messagesMerger,
            read(existing: { cursor: string; messages: Reference[] }, { readField }: { readField: ReadFieldFunction }) {
              if (existing)
                return {
                  cursor: existing.cursor,
                  messages: existing.messages
                    .slice(0)
                    .sort((message1, message2) => getMillisecondsDiff(readField("createdAt", message1)!, readField("createdAt", message2)!)),
                };
            },
          },
        },
      },
    },
  }),
});

export const AUTH_USER_CACHE_ID = "AuthUser:{}";
