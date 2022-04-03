import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class UserPost {
  static async addSupporter(params = {}) {
    const res = await FetchUtils.put(`/add-supporter`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async removeRegister(params = {}) {
    const res = await FetchUtils.put(`/remove-register`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async unregister(params = {}) {
    const res = await FetchUtils.put(`/unregister`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }
}
