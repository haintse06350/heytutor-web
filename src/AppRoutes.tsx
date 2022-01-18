import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/Example/Example";

export default function AppRoutes() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path={"/"} element={<Example />} />
          <Route path={"/example-page"} element={<Example />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
