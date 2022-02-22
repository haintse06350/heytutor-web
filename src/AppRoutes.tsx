import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
import Chat from "./components/Chat/Chat";
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";
// import Message from "./components/Message/Message";
// import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import UserProfile from "./components/UserProfile/UserProfile";
// import { UserCtx } from "./context/user/state";
// import { GlobalContextProvider } from "./context/index";

export default function AppRoutes() {
  // const { user }: any = React.useContext(UserCtx);

  return (
    <Router>
      <Fragment>
        <Routes>
          {/* <GlobalContextProvider> */}
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/post"} element={<Post />} />
          <Route path={"/profile"} element={<UserProfile />} />
          <Route path={"/test"} element={<Chat />} />
          <Route path={"/dashboard"} element={<Dashboard />} />

          {/* <Route path={"/profile"} element={!user ? <Login /> : user.isAdmin ? <Dashboard /> : <UserProfile />} /> */}
          {/* </GlobalContextProvider> */}
        </Routes>
        <BottomNav />
      </Fragment>
    </Router>
  );
}
