import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
// import Example from "./components/Example/Example";
import Header from "./components/Header/Header";
import Message from "./components/Message/Message";
import Post from "./components/Post/Post";

export default function AppRoutes() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path={"/"} element={<Header />} />
          <Route path={"/example-page"} element={<Message />} />
          <Route path={"/create-post"} element={<Post />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
