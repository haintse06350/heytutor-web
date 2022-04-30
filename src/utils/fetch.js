import fetch from "isomorphic-unfetch";
import _ from "lodash";

const api = process.env.REACT_APP_API || "http://34.207.112.134:3001";
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

  static upload(url, key, value, token) {
    console.log(url, key, value, token);
    return new Promise((resolve, reject) => {
      const body = new window.FormData();
      let payload = value;

      if (!_.isArray(payload)) {
        payload = [payload];
      }

      _.each(payload, (entity) => {
        body.append(key, entity);
      });

      const xhr = new window.XMLHttpRequest();

      xhr.timeout = 120000;

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          console.log(JSON.parse(xhr.responseText));
          return reject(JSON.parse(xhr.responseText)?.message || "Oops...");
        }
      };

      xhr.open("POST", `${api}${url}`);
      xhr.setRequestHeader("X-Auth-Token", `Bearer ${token}`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(body);
    });
  }
}
