import client from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

import { LoadingProvider } from "@/components/LoadingContext";
import GlobalLoading from "@/components/GlobalLoading";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
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
