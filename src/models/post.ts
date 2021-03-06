import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Post {
  static async create(params = {}) {
    const res = await FetchUtils.post(`/post`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listPostsByUserRole() {
    const res = await FetchUtils.get(`/list-post-by-user-role`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async listAllPosts() {
    const res = await FetchUtils.get(`/list-all-post`);
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

  static getListPostByFilter = async (params: any) => {
    const query = JSON.stringify(params);
    const res = await FetchUtils.get(`/get-list-post-by-filter?filter=${query}`);
    await ErrorUtils.throwError(res);
    return res.json();
  };

  static getListRegisteredPost = async (filters: any) => {
    const res = await FetchUtils.get(`/user-post/registered?filters=${JSON.stringify(filters)}`);
    await ErrorUtils.throwError(res);
    return res.json();
  };

  static getListMyRequest = async (filters: string) => {
    const res = await FetchUtils.get(`/user-post/my-request?filters=${JSON.stringify(filters)}`);
    await ErrorUtils.throwError(res);
    return res.json();
  };

  static getPostDetail = async (postId: any) => {
    const res = await FetchUtils.get(`/get-post-detail/${postId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  };
}
