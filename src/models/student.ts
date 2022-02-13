import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Students {
  static async list(token: string, params: any = {}) {
    const { limit, offset } = params;
    const res = await FetchUtils.get(`/list-student?limit=${limit}&offset=${offset}`, token);

    await ErrorUtils.throwError(res);

    return res.json();
  }
}
