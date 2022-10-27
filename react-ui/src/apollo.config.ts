import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL, credentials: "include" });

const wsLink = new GraphQLWsLink(createClient({ url: import.meta.env.VITE_SUBSCRIPTION_URL }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      AuthUser: {
        keyFields: [],
      },
    },
  }),
});

export const AUTH_USER_CACHE_ID = "AuthUser:{}";
