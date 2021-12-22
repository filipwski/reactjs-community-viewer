import { ApolloProvider } from '@apollo/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { client } from 'apiClient/client';
import { render } from 'react-dom';

render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
