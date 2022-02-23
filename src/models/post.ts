import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Post {
  static async create(params = {}) {
    const res = await FetchUtils.post(`/post`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listPosts(params = {}) {
    const res = await FetchUtils.get(`/list-post`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async listPostsByUserId(userId: string, params = {}) {
    const res = await FetchUtils.get(`/listPostByUserId/${userId}`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async search(query: string) {
    const res = await FetchUtils.get(`/search?query=${query}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
