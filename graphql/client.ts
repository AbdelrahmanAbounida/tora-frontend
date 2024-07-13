import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const apollo_client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_GRAPHQL_SERVER_URL, // GET IT BY >> hostname -I // "https://a19c-104-151-94-170.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
  // defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  headers: {
    "API-KEY": process.env.EXPO_PUBLIC_GRAPHQL_API_KEY!,
  },
});

console.log("Apollo Client is ready");
console.log(process.env.EXPO_PUBLIC_GRAPHQL_SERVER_URL);
