import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Example from "./components/Example/Example";
import Header from "./components/Header/Header";

export default function AppRoutes() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path={"/"} element={<Header />} />
          <Route path={"/example-page"} element={<Example />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
