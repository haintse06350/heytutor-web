import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class Fap {
  static async listStudents(params: any = {}) {
    const { limit, offset } = params;
    const res = await FetchUtils.get(`/list-student?limit=${limit}&offset=${offset}`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async countStudents() {
    const res = await FetchUtils.get(`/count-student`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async countClass() {
    const res = await FetchUtils.get(`/count-class`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async countCourse() {
    const res = await FetchUtils.get(`/count-course`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listClass(params: any = {}) {
    const { limit, offset } = params;
    const res = await FetchUtils.get(`/list-class?limit=${limit}&offset=${offset}`);

    await ErrorUtils.throwError(res);

    return res.json();
  }

  static async listCourse(params: any = {}) {
    const { limit, offset } = params;
    const res = await FetchUtils.get(`/list-course?limit=${limit}&offset=${offset}`);

    await ErrorUtils.throwError(res);

    return res.json();
  }
}
