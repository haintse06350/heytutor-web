import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Event {
    static async getListEventByUser(){
        const res = await FetchUtils.get(`/get-list-event-of-user`);
        await ErrorUtils.throwError(res);
        return res.json();
    }
    static async getEventStats(params={}){
        const eventId = params;
        const res = await FetchUtils.get(`/get-event-stats/${eventId}`);
        await ErrorUtils.throwError(res);
        return res.json();
    }
}
