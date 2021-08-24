import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useState } from "react";
import Router from "./Router";
import Cookies from "js-cookie";
import { FullContainer } from "./assets/styles/wrappers";
import { ContextProvider} from "./Context";

const App = () => {
  const [token, setToken] = useState(Cookies.get("token"));
  const refreshToken = Cookies.get("refreshToken");
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `JWT ${token}`,
        "x-requested-with": refreshToken,
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "http://localhost:8000/app/graphql",
    credentials: "include",
  });

  const addDateLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      setToken(Cookies.get("token")!);
      return response;
    });
  });

  const client = new ApolloClient({
    link: addDateLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ContextProvider>
        <FullContainer>
          <Router />
        </FullContainer>
      </ContextProvider>
    </ApolloProvider>
  );
};

export default App;
