import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";
export class User {
  /**
   * To update data of the user are using app
   */
  static updateUser = async (params: any) => {
    //do something here
  };

  static login = async (token: string, params = {}) => {
    const res = await FetchUtils.post(`/auth/login`, token, params);
    await ErrorUtils.throwError(res);
    return res.json();
  };
}
