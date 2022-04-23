export default interface IUserCtx {
  user: any;
  loginAdmin: (user: any) => Promise<any>;
  login: (user: any) => Promise<any>;
  logout: () => Promise<void>;
}
