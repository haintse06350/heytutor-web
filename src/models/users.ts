import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";
export class User {
  /**
   * To update data of the user are using app
   */
  static updateUser = async (params: any) => {
    //do something here
  };

  static login = async (params = {}) => {
    const res = await FetchUtils.post(`/auth/login`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  };

  static getUserProfile = async (userId: string | number) => {
    const res = await FetchUtils.get(`/user/${userId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  };
}
