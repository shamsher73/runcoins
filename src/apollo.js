
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/react-hooks';
import Config from 'react-native-config';

const makeApolloClient = (token) => {

  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: Config.HASURA_URL,
    headers: {
        'x-hasura-admin-secret': Config.HASURA_ADMIN_SECRET
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
