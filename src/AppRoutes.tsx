import React, { Fragment } from "react";
import Post, { CreatePost } from "./components/CreatePost/CreatePost";
import { UserCtx } from "./context/user/state";
import { ListData } from "./components/ListData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import CrawlTool from "./components/Dashboard/CrawlTool";
import HomePage from "./components/HomePage/HomePage";
import Loginv2 from "./components/Loginv2/Loginv2";
import CreateEvent from "./components/Dashboard/ManagerEvent/CreateEvent";
import Feedback from "./components/Feedback/Feedback";
import UserProfile from "./components/UserProfile/UserProfile";
import RequireAuth from "./RequireAuth";
import RequireAuthAdmin from "./RequireAuthAdmin";
import NotFound from "./components/NotFound/NotFound";
import PostItem from "./components/PostDetail/PostItem";
import ListMyPost from "./components/HomePage/ListMyPost/ListMyPost";
import PostDetail from "./components/HomePage/PostDetail";
import EventDetail from "./components/Event/EventDetail";
import EventList from "./components/Event/EventList";
import DashBoardLayout from "./components/Dashboard/DashBoardLayout";
import ManagerUserDetail from "./components/Dashboard/ManagerUser/ManageUserDetail";
import ManagePost from "./components/Dashboard/ManagePost/ManagePost";
import ManagerUser from "./components/Dashboard/ManagerUser/ManagerUser";
import ManagerCTV from "./components/Dashboard/ManagerCTV/ManagerCTV";
import HomeManager from "./components/Dashboard/HomeDashBoard/HomeManager";
import HomeManageCTV from "./components/Dashboard/HomeDashBoard/HomeManageCTV";
import ManageEvent from "./components/Dashboard/ManagerEvent/Admin/ManageEvent";
// import ManagerProfileUser from "./components/Dashboard/ManagerUser/ManagerProfileUser";
import ManagerDetailCTV from "./components/Dashboard/ManagerCTV/ManagerDetailCTV";
import ManagerEventDetail from "./components/Dashboard/ManagerEvent/Admin/ManageEventDetail";
import HomeSupperAdmin from "./components/Dashboard/HomeDashBoard/HomeSupperAdmin";
import LoginAdmin from "./components/Dashboard/LoginAdmin";
import Search from "./components/HomePage/Search/Search";

export default function AppRoutes() {
  const { login }: any = React.useContext(UserCtx);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userToken = urlParams.get("token");

    if (userToken) {
      localStorage.setItem("heytutor-user", userToken);
      login(userToken);
      window.location.href = window.location.pathname;
    }
  }, []);

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
          <Route
            path={"/profile"}
            element={
              <RequireAuth>
                <UserProfile />
              </RequireAuth>
            }
          />
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
                <ListData />
              </RequireAuth>
            }
          />
          <Route
            path={"/registered-request"}
            element={
              <RequireAuth>
                <ListData />
              </RequireAuth>
            }
          />

          <Route path={"/login"} element={<Loginv2 />} />
          {/** chưa có page */}
          {/* <Route path={"/profile"} element={<UserProfile />} /> */}
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
          <Route
            path={"/dashboard/admin/create-event"}
            element={
              <DashBoardLayout>
                <CreateEvent />
              </DashBoardLayout>
            }
          />

          <Route
            path={"/create-post"}
            element={
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            }
          />

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
            path={"/fap-tool"}
            element={
              <RequireAuth>
                <CrawlTool />
              </RequireAuth>
            }
          />
          <Route
            path={"/post-detail"}
            element={
              <RequireAuth>
                <PostItem />
              </RequireAuth>
            }
          />
          <Route
            path={"/post-detail"}
            element={
              <RequireAuth>
                <PostDetail />
              </RequireAuth>
            }
          />

          <Route
            path={"/testUseLocalStorage"}
            element={
              <RequireAuth>
                <CreatePost />
              </RequireAuth>
            }
          />
          <Route
            path={"/event-detail"}
            element={
              <RequireAuth>
                <EventDetail />
              </RequireAuth>
            }
          />
          <Route
            path={"/event-list"}
            element={
              <RequireAuth>
                <EventList />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/manage-user"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManagerUser />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/manage-user/detail"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManagerUserDetail />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/manage-post"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManagePost />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/manage-ctv"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManagerCTV />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/home-ctv"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <HomeManageCTV />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/home-manager"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <HomeManager />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/search"}
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path={"/dashboard/admin/manage-event"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManageEvent />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />

          <Route
            path={"/dashboard/manage-ctv/profile"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManagerDetailCTV />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/admin/manage-event/detail"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <ManagerEventDetail />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/supper-admin"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <HomeSupperAdmin />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />
          <Route
            path={"/dashboard/admin/manage-event/create-event"}
            element={
              <RequireAuthAdmin>
                <DashBoardLayout>
                  <CreateEvent />
                </DashBoardLayout>
              </RequireAuthAdmin>
            }
          />

          <Route path={"/dashboard/login"} element={<LoginAdmin />} />
        </Routes>
      </Fragment>
    </Router>
  );
}
