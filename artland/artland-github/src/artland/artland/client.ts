import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { APOLLO_CLIENT_URI } from 'apps/base/constants';


const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_AUTH_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(createHttpLink({
    uri: APOLLO_CLIENT_URI,
  })),
});

export default client;
