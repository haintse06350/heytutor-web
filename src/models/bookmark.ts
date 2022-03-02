import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Bookmark {
  static async addBookmark(params: any = {}) {
    const res = await FetchUtils.post(`/add-bookmark`, params);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async removeBookmark(params: any = {}) {
    const res = await FetchUtils.delete(`/remove-bookmark`, params);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listBookmarksLite() {
    const res = await FetchUtils.get(`/list-bookmark-lite`);

    await ErrorUtils.throwError(res);

    return res.json();
  }
}
