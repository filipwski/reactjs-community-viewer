import { ApolloProvider } from '@apollo/client';
import { StrictMode } from 'react'
import { render } from 'react-dom';
import { App } from './App';
import { client } from './apiClient/client';
import { BrowserRouter } from "react-router-dom";

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
