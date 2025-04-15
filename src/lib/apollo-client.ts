import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next";
import { shouldRefreshToken, refreshAccessToken } from "./tokenUtils";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

const authLink = setContext(async (_, { headers }) => {
  const token = getCookie("userToken") as string | undefined;
  
  if (token && shouldRefreshToken(token)) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
      };
    }
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
