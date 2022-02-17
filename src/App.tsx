import "./App.css";
import AppRoutes from "./AppRoutes";
import React from "react";
import withTheme from "./withTheme";

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default withTheme(App);
