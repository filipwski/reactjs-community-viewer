import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import env from 'react-dotenv';

const getToken = setContext(async () => {
  const token = env.GITHUB_ACCESS_TOKEN;
  return { headers: { Authorization: `Bearer ${token}` } };
});

const httpsLink = createHttpLink({ uri: 'https://api.github.com/graphql' });

const link = ApolloLink.from([getToken, httpsLink])

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
