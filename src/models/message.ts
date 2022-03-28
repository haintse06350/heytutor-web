import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Message {
  static async getPostConversation(postId: string, userId: number) {
    const res = await FetchUtils.get(`/conversations-of-post?postId=${postId}&userId=${userId}`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listMessages(params: any = {}) {
    const { limit, offset, conversationId } = params;
    const res = await FetchUtils.get(`/list-messages?limit=${limit}&offset=${offset}&conversationId=${conversationId}`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async sendMessage(params: any = {}) {
    const res = await FetchUtils.post(`/message`, params);
    await ErrorUtils.throwError(res);

    return res.json();
  }
}
