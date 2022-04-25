import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NotificationProvider from "./context/notification/state";
import UserProvider from "./context/user/state";
import PostProvider from "./context/post/state";
import MsgProvider from "./context/message/message";
import ThemeConfig from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeConfig>
      <NotificationProvider>
        <UserProvider>
          <MsgProvider>
            <PostProvider>
              <App />
            </PostProvider>
          </MsgProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
