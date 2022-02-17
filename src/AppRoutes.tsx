import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
import Dashboard from "./components/Dashboard/Dashboard";
// import Example from "./components/Example/Example";
import Header from "./components/Header/Header";
// import Message from "./components/Message/Message";
import Post from "./components/Post/Post";
import UserProfile from "./components/UserProfile/UserProfile";

export default function AppRoutes() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path={"/"} element={<Header />} />
          <Route path={"/home"} element={<Header />} />
          <Route path={"/post"} element={<Post />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/profile"} element={<UserProfile />} />
        </Routes>
        <BottomNav />
      </Fragment>
    </Router>
  );
}
