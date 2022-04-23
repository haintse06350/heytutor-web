import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Admin {
  static async fetchFapData(token: string, params: any = {}) {
    const { cookie, termId } = params;
    const res = await FetchUtils.get(`/fap-data?fapCookie=${cookie}&termId=${termId}`, token);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  

  static async adminAuth() {
    await FetchUtils.get("/admin/create");
  }
}
