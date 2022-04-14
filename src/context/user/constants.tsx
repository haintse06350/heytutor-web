import jwt_decode from "jwt-decode";

let user: any = null;
let admin: any = null;
const userToken = localStorage.getItem("heytutor-user");
const adminToken = localStorage.getItem("heytutor-admin");

if (userToken) {
  const decoded: any = jwt_decode(userToken);
  user = decoded.user;
}

if (adminToken) {
  const decoded: any = jwt_decode(adminToken);
  admin = decoded.user;
}

export const INITIAL_STATE = {
  user,
  admin,
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
