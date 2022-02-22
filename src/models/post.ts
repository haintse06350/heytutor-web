import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Posts {
  static async create(token: string, params = {}) {
    const res = await FetchUtils.post(`/post`, token, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listPosts(token: string, params = {}) {
    const res = await FetchUtils.get(`/list-post`, token, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async listPostsByUserId(token: string, userId: string, params = {}) {
    const res = await FetchUtils.get(`/listPostByUserId/${userId}`, token, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async search(token: string, query: string) {
    const res = await FetchUtils.get(`/search?query=${query}`, token);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
