import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
// import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";
// import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import Event from "./components/CreateEvent/CreatEvent";
import UserProfile from "./components/UserProfile/UserProfile";
// import { UserCtx } from "./context/user/state";
// import { GlobalContextProvider } from "./context/index";

export default function AppRoutes() {
  // const { user }: any = useContext(UserCtx);

  return (
    <Router>
      <Fragment>
      <Routes>
          {/* <GlobalContextProvider> */}
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/post"} element={<Post />} />
          <Route path={"/profile"} element={<UserProfile />} />
          <Route path={"/event"} element={<Event />} />

          {/* <Route path={"/profile"} element={!user ? <Login /> : user.isAdmin ? <Dashboard /> : <UserProfile />} /> */}
          {/* </GlobalContextProvider> */}
        </Routes>
        <BottomNav />
      </Fragment>
    </Router>
  );
}
