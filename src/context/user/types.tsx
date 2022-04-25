export default interface IUserCtx {
  openGuideline: boolean;
  user: any;
  onOpenGuideline: () => Promise<void>;
  onCloseGuideline: () => Promise<void>;
  loginAdmin: (user: any) => Promise<any>;
  login: (user: any) => Promise<any>;
  logout: () => Promise<void>;
}
