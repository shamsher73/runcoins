
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/react-hooks';

const makeApolloClient = (token) => {

  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
    headers: {
        'x-hasura-admin-secret': 'myadminsecretkey'
    }
  });

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache()

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache
  });

  return client;
}

export default makeApolloClient;
