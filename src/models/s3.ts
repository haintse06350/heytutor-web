import FetchUtils from "../utils/fetch";
import { ErrorUtils } from "../utils/error";

export class s3Client {
  static async upload(params: any) {
    const { file, type, key, token } = params;
    const res = await FetchUtils.upload(`/file/upload/${type}`, key, file, token);
    await ErrorUtils.throwError(res);

    return res;
  }
}
