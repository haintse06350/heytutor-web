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

  static async getEventDetailByEventId(eventId: number | string) {
    const res = await FetchUtils.get(`/get-event-detail/${eventId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getEventNotEnroll() {
    const res = await FetchUtils.get(`/getListEventNotEnroll`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getListPostOnEvent(eventId: number | string) {
    const res = await FetchUtils.get(`/get-list-post-of-event/${eventId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async joinEvent(eventId: number | string) {
    const res = await FetchUtils.post(`/join-event`, { eventId });
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async unjoinEvent(eventId: number | string) {
    const res = await FetchUtils.delete(`/unjoin-event`, { eventId });
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async create(params: {}) {
    const res = await FetchUtils.post(`/event/create`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async isJoinEvent(eventId: number | string) {
    const res = await FetchUtils.get(`/check-user-in-event?eventId=${eventId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
