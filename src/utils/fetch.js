import fetch from "isomorphic-unfetch";

const api = process.env.REACT_APP_API;
const getSessionId = () => localStorage.getItem("heytutor-user");

export default class Network {
  static async fetch(url, method, body = null, headers = {}) {
    const fullUrl = `${api}${url}`;

    return fetch(fullUrl, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Token": headers.authorization,
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });
  }

  static async ajax(url, method, body, headers) {
    const token = getSessionId();

    return Network.fetch(url, method, body, {
      ...headers,
      authorization: `Bearer ${token}`,
    });
  }

  static get(url, headers) {
    return Network.ajax(url, "GET", null, headers);
  }

  static put(url, body, headers) {
    return Network.ajax(url, "PUT", body, headers);
  }

  static post(url, body, headers) {
    return Network.ajax(url, "POST", body, headers);
  }

  static delete(url, body, headers) {
    return Network.ajax(url, "DELETE", body, headers);
  }
}
