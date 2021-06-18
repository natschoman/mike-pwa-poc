import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

let client: ApolloClient<any>;

export const createClient = (): ApolloClient<any> => {
  const httpLink = createHttpLink({
    uri: 'https://api.spacex.land/graphql/'
  });

  client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return client;
};

export const clearCache = async () => {
  if (client) {
    await client.clearStore();
  }
};
