import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      contrastText: "#000000", //سیاه
      main: "#548f22", // سبز لجنی
      dark: "#406e1a",
      light: "#6ebd2b",
    },
    secondary: {
      main: "#36909e", // ابی فیروزه تیره
      light: "#43b3c4",
      dark: "#28707a",
      contrastText: "#000000",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);
