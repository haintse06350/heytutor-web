import React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import GlobalStyles from "./theme/globalStyles";
// theme

// ----------------------------------------------------------------------

export default function App() {
  return (
    <>
      <GlobalStyles />
      <AppRoutes />
    </>
  );
}
