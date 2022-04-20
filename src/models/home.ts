import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Home {
  static async getUserStats(filters: any) {
    const res = await FetchUtils.get(`/user-post/stats?filters=${JSON.stringify(filters)}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getSuggestData() {
    const res = await FetchUtils.get(`/suggest-home`);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
