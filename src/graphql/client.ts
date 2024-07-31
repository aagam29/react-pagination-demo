import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_AUTH_TOKEN, GRAPHQL_URL } from "../utils/constants.tsx";

export const apolloClient = new ApolloClient({
  uri: GRAPHQL_URL,
  headers: {
    Authorization: `Bearer ${API_AUTH_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
