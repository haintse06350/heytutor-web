import jwt_decode from "jwt-decode";

let user: any = null;
const userToken = localStorage.getItem("heytutor-user");

if (userToken) {
  const decoded: any = jwt_decode(userToken);
  user = decoded.user;
  console.log("user", user);
}

export const INITIAL_STATE = {
  user,
  // Mock functions that should never be called, they are just here to pass the type checks
  login: (user: any) => {
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
