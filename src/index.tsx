import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";
import { ThemeProvider } from 'styled-components';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "http://localhost:8000/app/graphql",
});


const token = "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InBhcmExMiIsImV4cCI6MTYyOTIxMTQ1Miwib3JpZ0lhdCI6MTYyOTIxMTE1Mn0.KaU1Fu_NnCpM3Co7Ms0hes87I813RtAWBH9o7IyhFXk"
const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);