import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Event {
  static async getListEventByUser() {
    const res = await FetchUtils.get(`/get-list-event-of-user`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getListEventByAdmin() {
    const res = await FetchUtils.get(`/listEventByAdmin`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getEventDetailByEventId(eventId: string) {
    const res = await FetchUtils.get(`/get-event-detail/${eventId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getEventNotEnroll() {
    const res = await FetchUtils.get(`/getListEventNotEnroll`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getListPostOnEvent(eventId: string) {
    const res = await FetchUtils.get(`/get-list-post-of-event/${eventId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async joinEvent(eventId: number) {
    const res = await FetchUtils.post(`/join-event`, { eventId: eventId });
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async create(params: {}) {
    const res = await FetchUtils.post(`/event/create`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
