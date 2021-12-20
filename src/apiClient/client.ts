import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import env from 'react-dotenv';
import { setContext } from '@apollo/client/link/context';

const getToken = setContext(async () => {
  const token = env.GITHUB_ACCESS_TOKEN;
  return { headers: { Authorization: `Bearer ${token}` } };
});

const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });
const link = ApolloLink.from([getToken, httpLink]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
