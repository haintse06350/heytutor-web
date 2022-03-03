import React, { Fragment, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
import Chat from "./components/Chat/Chat";
import Dashboard from "./components/Dashboard/Dashboard";
// import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import PostDetail from "./components/HomePage/PostDetail";
// import Message from "./components/Message/Message";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
// import Post2 from "./components/Post2/Post";
import CreateEvent from "./components/CreateEvent/CreatEvent";
import Feedback from "./components/Feedback/Feedback";
import LimitActivity from "./components/Dialog/LimitActivity/LimitActivity"
import RemovePost from "./components/Dialog/RemovePost/RemovePost"
import RemoveComment from "./components/Dialog/RemoveComment/RemoveComment"


import UserProfile from "./components/UserProfile/UserProfile";
import { UserCtx } from "./context/user/state";

export default function AppRoutes() {
  const { user }: any = useContext(UserCtx);

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path={"/profile"} element={!user ? <Login /> : user.isAdmin ? <Dashboard /> : <UserProfile />} />
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/home"} element={<HomePage />} />
          <Route path={"/post"} element={<Post />} />
          <Route path={"/profile"} element={<UserProfile />} />
          <Route path={"/createEvent"} element={<CreateEvent />} />
          <Route path={"/feedback"} element={<Feedback />} />
          <Route path={"/chat"} element={<Chat />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/test"} element={<PostDetail />} />
          <Route path={"/limitActivity"} element={<LimitActivity />} />
          <Route path={"/removePost"} element={<RemovePost />} />
          <Route path={"/removeComment"} element={<RemoveComment />} />

        </Routes>
        <BottomNav />
      </Fragment>
    </Router>
  );
}
