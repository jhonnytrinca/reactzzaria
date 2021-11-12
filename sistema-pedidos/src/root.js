import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
      <AuthProvider>
        <CssBaseline />
        <BrowserRouter>
          <Route component={App} />
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default Root;
