import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

import { LoadingProvider } from "@/components/LoadingContext";
import GlobalLoading from "@/components/GlobalLoading";

function MyApp({ Component, pageProps }: any) {
  return (
    <LoadingProvider>
      <GlobalLoading />
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </LoadingProvider>
  );
}

export default MyApp;
