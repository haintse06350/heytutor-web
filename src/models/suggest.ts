import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Suggest {
  static async listCourses() {
    const res = await FetchUtils.get(`/list-courses`);

    await ErrorUtils.throwError(res);

    return res.json();
  }
}
