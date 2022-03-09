import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Dashboard from "./components/Dashboard/Dashboard";
// import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
// import PostDetail from "./components/HomePage/PostDetail";
// import Message from "./components/Message/Message";
// import Login from "./components/Login/Login";
import Loginv2 from "./components/Loginv2/Loginv2";
import Post from "./components/CreatePost/CreatePost";
// import Post2 from "./components/Post2/Post";
import CreateEvent from "./components/CreateEvent/CreatEvent";
import Feedback from "./components/Feedback/Feedback";
import LimitActivity from "./components/Dialog/LimitActivity/LimitActivity";
import RemovePost from "./components/Dialog/RemovePost/RemovePost";
import RemoveComment from "./components/Dialog/RemoveComment/RemoveComment";

// import UserProfile from "./components/UserProfile/UserProfile";
// import { UserCtx } from "./context/user/state";
import RequireAuth from "./RequireAuth";
import NotFound from "./components/NotFound/NotFound";
import PostItem from "./components/HomePage/PostItem";

export default function AppRoutes() {
  // const { user }: any = React.useContext(UserCtx);

  return (
    <Router>
      <Fragment>
        <Routes>
          <Route
            path={"/"}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />

          {/** test */}
          {/* <Route
            path={"/profile"}
            element={<RequireAuth>{user?.isAdmin ? <Dashboard /> : <UserProfile />}</RequireAuth>}
          /> */}
          <Route
            path={"/home"}
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path={"/login"} element={<Loginv2 />} />

          {/** chưa có page */}
          <Route path={"/profile"} element={<NotFound />} />
          <Route path={"/event"} element={<NotFound />} />
          <Route path={"/notification"} element={<NotFound />} />

          <Route
            path={"/post"}
            element={
              <RequireAuth>
                <Post />
              </RequireAuth>
            }
          />
          <Route path={"/createEvent"} element={<CreateEvent />} />
          <Route path={"/feedback"} element={<Feedback />} />
          <Route
            path={"/chat"}
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard"}
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={"/test"}
            element={
              <PostItem
                post={{
                  id: 1,
                  userId: 1,
                  eventId: 1,
                  user: { id: 1, name: "Duc anh" },
                  title: "Help CSD nao cac tinh yeu",
                  content: "sjahdkashdkjsahdkjsahdkjsahkd dhsakjdhksajhda",
                  hashtag: ["#CSD", "#MAS"],
                  commentCount: 12,
                }}
              />
            }
          />
          <Route path={"/limitActivity"} element={<LimitActivity />} />
          <Route path={"/removePost"} element={<RemovePost />} />
          <Route path={"/removeComment"} element={<RemoveComment />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
