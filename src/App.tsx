import React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// theme

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <AppRoutes />
    </ThemeConfig>
  );
}
