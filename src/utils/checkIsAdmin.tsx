/* eslint-disable no-prototype-builtins */
export const isAdmin = (user: any) => {
  if (user?.signInUserSession?.accessToken?.payload?.hasOwnProperty("admin")) {
    const userRole = user?.signInUserSession?.accessToken?.payload["role"];
    const isAdmin = userRole?.length > 0 && (userRole.includes("Editorial") || userRole.includes("Publisher"));
    return isAdmin;
  }
};
