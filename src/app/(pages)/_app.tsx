import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: any) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
