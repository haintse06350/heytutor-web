import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import BottomNav from "./components/BottomNavigation/BottomNavigation";
import NavigationBar from "./components/Common/NavigationBar/NavigationBar";
import { UserCtx } from "./context/user/state";

const RequireAuth = ({ children }: any) => {
  const { user } = useContext(UserCtx);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavigationBar />
      {children}
      <BottomNav />
    </div>
  );
};

export default RequireAuth;
