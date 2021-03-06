import jwt_decode from "jwt-decode";

let user: any = null;
const urlParams = new URLSearchParams(window.location.search);
const userTokenParam = urlParams.get("token");
userTokenParam && localStorage.setItem("heytutor-user", userTokenParam);
const userToken = localStorage.getItem("heytutor-user");
if (userToken) {
  const decoded: any = jwt_decode(userToken);
  user = decoded.user;
  console.log("user", user);
}

export const INITIAL_STATE = {
  openGuideline: false,
  user,
  // Mock functions that should never be called, they are just here to pass the type checks
  login: (user: any) => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
  onOpenGuideline: () => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
  onCloseGuideline: () => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
  loginAdmin: (user: any) => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
  logout: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
  getUserData: () => {
    return new Promise<any>(function (resolve, reject) {
      reject({});
    });
  },
};
