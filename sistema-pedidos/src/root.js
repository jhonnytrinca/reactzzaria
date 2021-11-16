import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { CssBaseline, createTheme, MuiThemeProvider } from "@material-ui/core";
import App from "./app";
import AuthProvider from "./contexts/auth";

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
});

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default Root;
