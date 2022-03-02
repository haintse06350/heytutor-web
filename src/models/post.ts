import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Post {
  static async create(params = {}) {
    const res = await FetchUtils.post(`/post`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listPostsByUserRole(params = {}) {
    const res = await FetchUtils.get(`/list-post-by-user-role`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async listAllPosts(params = {}) {
    const res = await FetchUtils.get(`/list-all-post`, params);
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

  static updatePost = async (params: any) => {
    const res = await FetchUtils.put(`/update-post`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  };

  static likePost = async (params: any) => {
    const res = await FetchUtils.put(`/like-post`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  };
}
