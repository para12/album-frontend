import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import GlobalStyle from "./assets/styles/global-styles";
import { theme } from "./assets/styles/theme";
import { ThemeProvider } from "styled-components";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
