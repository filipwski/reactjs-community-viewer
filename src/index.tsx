import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react'
import { render } from 'react-dom';
import { App } from './App';
import { client } from './apiClient/client';

render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
