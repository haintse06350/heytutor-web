import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserCtx } from "./context/user/state";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import { NotificationCtx } from "./context/notification/state";

const RequireAuth = ({ children, ...props }: any) => {
  const { user } = useContext(UserCtx);
  const { setNotificationInfo } = useContext(NotificationCtx);

  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  if (error) {
    setNotificationInfo("Đăng nhập thất bại! Vui lòng thử lại với tài khoản FPT education");
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {!props.hideTopNav && <NavigationBar />}
      {children}
      <BottomNav />
    </div>
  );
};

export default RequireAuth;
