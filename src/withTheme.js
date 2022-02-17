import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { JssProvider, SheetsRegistry } from "react-jss";
import { create } from "jss";
import { jssPreset, StylesProvider } from "@mui/styles";

const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: "jss-insertion-point",
});

const theme = createTheme({});

function withTheme(Component) {
  function WithTheme(props) {
    const sheets = new SheetsRegistry();

    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <JssProvider registry={sheets} jss={jss}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...props} />
          </StylesProvider>
        </ThemeProvider>
      </JssProvider>
    );
  }

  return WithTheme;
}

export default withTheme;
