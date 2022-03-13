import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Home{
    static async getUserStats(params = {}){
        const res = await FetchUtils.get(`/user-post/stats`, params);
        await ErrorUtils.throwError(res);
        return res.json();
    }
}