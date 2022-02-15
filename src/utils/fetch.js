import _ from "lodash";
import fetch from "isomorphic-unfetch";
// import Cookies from "js-cookie";

const api = process.env.REACT_APP_API;

export default class Network {
  static async ajax(url, sessionId, method, body, headers) {
    let token = sessionId;
    // if (process.browser) {
    //   token = Cookies.get(process.env.COOKIE_USER) || Cookies.get(process.env.COOKIE_ANONYMOUS);
    // }

    return Network.fetch(
      url,
      method,
      body,
      _.extend(headers, { authorization: `Bearer ${token}`, "X-Auth-Token": `Bearer ${token}` })
    );
  }

  static async fetch(url, method, body, headers) {
    return fetch(`${api}${url}`, {
      method,
      headers: _.extend(
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Auth-Token": headers.authorization,
        },
        headers
      ),
      body: body ? JSON.stringify(body) : null,
    });
  }

  static get(url, token, headers) {
    return Network.ajax(url, token, "GET", null, headers);
  }

  static put(url, token, body, headers) {
    return Network.ajax(url, token, "PUT", body, headers);
  }

  static post(url, token, body, headers) {
    return Network.ajax(url, token, "POST", body, headers);
  }

  static delete(url, token, body, headers) {
    return Network.ajax(url, token, "DELETE", body, headers);
  }
}
