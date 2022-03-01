import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Comment {
  static async listCommentByPost(params: any = {}) {
    const { postId, limit, offset } = params;
    const res = await FetchUtils.get(`/api/comment/${postId}`, { limit, offset });

    await ErrorUtils.throwError(res);

    return res.json();
  }
}
