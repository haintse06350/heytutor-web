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

  static async getListEventIsNotApproveOfCollaborator(params = {}) {
    const res = await FetchUtils.get(`/get-event-not-approve-of-collaborator`, params);
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
    const res = await FetchUtils.put(`/create-ban`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async getCollaboratorById(userId: any) {
    const res = await FetchUtils.get(`/collaborator-detail-information?userId=${userId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }
  static async createCollaborator(params: any = {}) {
    const res = await FetchUtils.post(`/add-new-collaborator`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async createFeedback(params: any = {}) {
    const res = await FetchUtils.post(`/add-new-feedback`, params);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async createBanCollaborator(collaboratorId: any) {
    const res = await FetchUtils.put(`/ban-collaborator?collaboratorId=${collaboratorId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }

  static async approveEvent(eventId: any) {
    const res = await FetchUtils.put(`/approve-event?eventId=${eventId}`);
    await ErrorUtils.throwError(res);
    return res.json();
  }
}
