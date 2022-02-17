export default interface INotificationCtx {
  isShowNotification: boolean;
  classify: any;
  message: string;
  setShowNotif: (isShowNotification: boolean) => Promise<any>;
  setNotificationError: (message: string) => Promise<any>;
  setNotificationSuccess: (message: string) => Promise<any>;
  setNotificationInfo: (message: string) => Promise<any>;
}
