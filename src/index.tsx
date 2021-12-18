import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react'
import { render } from 'react-dom';
import { App } from './App';
import { apiClient } from './clients/apiClient';

render(
  <StrictMode>
    <ApolloProvider client={apiClient}>
      <App />
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root')
);
