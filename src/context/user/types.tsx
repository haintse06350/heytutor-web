export default interface IUserCtx {
  user: any;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}
