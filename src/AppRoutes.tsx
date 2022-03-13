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
import Post, { CreatePost } from "./components/CreatePost/CreatePost";
// import Post2 from "./components/Post2/Post";
import CreateEvent from "./components/CreateEvent/CreatEvent";
import Feedback from "./components/Feedback/Feedback";

// import UserProfile from "./components/UserProfile/UserProfile";
// import { UserCtx } from "./context/user/state";
import RequireAuth from "./RequireAuth";
import NotFound from "./components/NotFound/NotFound";
import PostItem from "./components/HomePage/PostItem";
// import ManagerUser from "./components/ManagerUser/ManagerUser";
import ManagerUser from "./components/ManagerUser/ManagerUser";
import ListMyPost from "./components/HomePage/ListMyPost/ListMyPost";
import { DetailPage } from "./components/DetailPage";
import PostDetail from "./components/HomePage/PostDetail";

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
          <Route
            path={"/my-request"}
            element={
              <RequireAuth>
                <DetailPage />
              </RequireAuth>
            }
          />
          <Route
            path={"/registered-request"}
            element={
              <RequireAuth>
                <DetailPage />
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
            path={"/my-posts"}
            element={
              <RequireAuth>
                <ListMyPost />
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
                  user: { id: 2, name: "Duc anh" },
                  title: "Help CSD nao cac tinh yeu",
                  content: "sjahdkashdkjsahdkjsahdkjsahkd dhsakjdhksajhda",
                  hashtag: ["#CSD", "#MAS"],
                  commentCount: 12,
                }}
              />
            }
          />
          <Route
            path={"/test-post-detail"}
            element={
              <PostDetail
                post={{
                  id: 1,
                  userId: 1,
                  eventId: 1,
                  user: { id: 2, name: "Duc anh" },
                  title: "Help CSD nao cac tinh yeu",
                  content: "sjahdkashdkjsahdkjsahdkjsahkd dhsakjdhksajhda",
                  hashtag: ["#CSD", "#MAS"],
                  commentCount: 12,
                }}
                openDialog={true}
                listComment={[
                  { id: 1, user: { name: "Duc Anh" }, comment: "Inbox toi ban oi", createdAt: "9 phút trước" },
                  { id: 2, user: { name: "Trung Hai" }, comment: "Inbox toi ban oi", createdAt: "9 phút trước" },
                ]}
              />
            }
          />
          <Route path={"/testTableList"} element={<ManagerUser />} />
          <Route path={"/testUseLocalStorage"} element={<CreatePost />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
