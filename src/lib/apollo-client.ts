import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://loadbalancerlmscore-1401289988.ap-east-1.elb.amazonaws.com/backoffice", // GraphQL API URL
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im55YW1kb3JqbWFpbEBnbWFpbC5jb20iLCJyb2xlcyI6WyJwcm9kdWN0IiwidGFnIiwidXNlciJdfQ.hDV4AdSvBAubUJInBOrtnqO4fS8yA3tVE208lJHQxq0`,
  },
});

export default client;
