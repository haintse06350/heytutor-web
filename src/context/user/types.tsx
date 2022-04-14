export default interface IUserCtx {
  user: any;
  admin: any;
  loginAdmin: (user: any) => Promise<any>;
  login: (user: any) => Promise<any>;
  logout: () => Promise<void>;
}
