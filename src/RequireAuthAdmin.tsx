import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserCtx } from "./context/user/state";
import { NotificationCtx } from "./context/notification/state";

const RequireAuthAdmin = ({ children }: any) => {
  const { user } = useContext(UserCtx);
  const { setNotificationInfo } = useContext(NotificationCtx);

  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  if (error) {
    setNotificationInfo("Đăng nhập thất bại! Vui lòng thử lại với tài khoản FPT education");
  }

  if (!user?.role) {
    return <Navigate to="/dashboard/login" />;
  }

  return <div>{children}</div>;
};

export default RequireAuthAdmin;
