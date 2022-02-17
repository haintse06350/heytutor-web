import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Posts {
  static async create(token: string, params = {}) {
    const res = await FetchUtils.post(`/post`, token, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }
}
