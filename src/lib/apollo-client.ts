import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibnlhbWRvcmptYWlsQGdtYWlsLmNvbSIsInJvbGVzIjpbInByb2R1Y3QiLCJ0YWciLCJ1c2VyIl19.awN_PCBKrw-0rLDlL1EpjMY8OuD8crZD2h-x6gEGcek`,
  },
});

export default client;