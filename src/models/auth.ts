import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Auth {
  static async auth() {
    const res = await FetchUtils.get(`/auth/google`);

    await ErrorUtils.throwError(res);

    return res.json();
  }
}
