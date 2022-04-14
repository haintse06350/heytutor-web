import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Manager{
    static async getUserManage(params = {}){
        const res = await FetchUtils.get(`/manage-user-event`, params);
        await ErrorUtils.throwError(res);
        return res.json();
    }
    static async getListCollaborator(params = {}){
        const res = await FetchUtils.get(`/list-collaborator`, params);
        await ErrorUtils.throwError(res);
        return res.json();
    }
}