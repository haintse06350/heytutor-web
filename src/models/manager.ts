import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Manager {
  static async getUserManage(params = {}) {
    const res = await FetchUtils.get(`/manage-user-event`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }
  static async getListCollaborator(params = {}) {
    const res = await FetchUtils.get(`/list-collaborators`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getListEventOfCollaborator(params = {}) {
    const res = await FetchUtils.get(`/get-active-event-of-collaborator`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getListPostManage(params = {}) {
    const res = await FetchUtils.get(`/get-list-post-manage`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getUserReportById(params: any = {}) {
    const res = await FetchUtils.get(
      `/list-reports-of-user-in-event?userId=${params.userId}&eventId=${params.eventId}`
    );
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async createBanUser(params: any = {}) {
    const res = await FetchUtils.post(`/create-ban`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
