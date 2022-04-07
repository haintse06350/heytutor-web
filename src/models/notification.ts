import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Notification {
  static async listNotification() {
    const res = await FetchUtils.get(`/notifications`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async readNotification(params = {}) {
    const res = await FetchUtils.put(`/notifications/read`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
