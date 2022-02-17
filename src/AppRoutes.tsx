import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
import Dashboard from "./components/Dashboard/Dashboard";
// import Example from "./components/Example/Example";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
// import Message from "./components/Message/Message";
import Post from "./components/Post/Post";
import UserProfile from "./components/UserProfile/UserProfile";
import { UserCtx } from "./context/user/state";
// import { GlobalContextProvider } from "./context/index";

export default function AppRoutes() {
  const { user }: any = useContext(UserCtx);

  return (
    <Router>
      <Fragment>
        <Routes>
          {/* <GlobalContextProvider> */}
          <Route path={"/"} element={<Header />} />
          <Route path={"/home"} element={<Header />} />
          <Route path={"/post"} element={<Post />} />
          <Route path={"/profile"} element={!user ? <Login /> : user.isAdmin ? <Dashboard /> : <UserProfile />} />
          {/* </GlobalContextProvider> */}
        </Routes>
        <BottomNav />
      </Fragment>
    </Router>
  );
}
