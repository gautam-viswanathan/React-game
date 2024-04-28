import axios from "axios";
import apiConfig from "./apiConfig.json";

const client = axios.create({
  baseURL: "http://localhost:8000",
});

export const ApiHandler = ({
  apiName,
  params = {},
  body = {},
  queryParams = {},
}) => {
  return new Promise(async (resolve, reject) => {
    let headers = {
      Accept: "application/json",
    };

    try {
      let [method, url] = "";
      try {
        method = apiConfig["api"][apiName]["method"];
        url = await setUrlParams(apiConfig["api"][apiName]["url"], params);
      } catch (error) {
        reject({
          data: { message: error },
        });
      }
      headers["Content-Type"] = apiConfig["api"][apiName]["contentType"];
      selectApi(headers, url, body, method, queryParams)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    } catch (error) {
      reject({
        data: { message: error },
      });
    }
  });
};

function selectApi(headers, url, body, method, queryParams) {
  return new Promise((resolve, reject) => {
    switch (method) {
      case "GET":
        callGet(url, headers, queryParams)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
        break;
      case "POST":
        callPost(url, body, headers, queryParams)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
        break;
      case "PUT":
        callPut(url, body, headers)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
        break;
      case "DELETE":
        callDelete(url, headers)
          .then((response) => resolve(response))
          .catch((error) => reject(error));
        break;
    }
  });
}

function callGet(url, headers, queryParams) {
  return new Promise((resolve, reject) => {
    client
      .get(url, { headers: headers, params: queryParams })
      .then((response) => {
        resolve({
          data: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          reject();
        } else if (error.response) {
          reject({
            data: error.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
}

function callPost(url, body, headers, queryParams) {
  return new Promise((resolve, reject) => {
    client
      .post(url, body, { headers: headers, params: queryParams })
      .then((response) => {
        resolve({
          data: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          reject();
        } else if (error.response) {
          reject({
            data: error.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
}

function callPut(url, body, headers) {
  return new Promise((resolve, reject) => {
    client
      .put(url, body, { headers: headers })
      .then((response) => {
        resolve({
          data: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          reject();
        } else if (error.response) {
          reject({
            data: error.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
}

function callDelete(url, headers) {
  return new Promise((resolve, reject) => {
    client
      .delete(url, { headers: headers })
      .then((response) => {
        resolve({
          data: response.data,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          reject();
        } else if (error.response) {
          reject({
            data: error.response.data,
          });
        } else {
          reject(error);
        }
      });
  });
}

function setUrlParams(url, params) {
  return new Promise((resolve, reject) => {
    try {
      for (let param in params) {
        let key = "{" + param + "}";
        do {
          url = url.replace(key, params[param]);
        } while (url.includes(key));
      }
      resolve(url);
    } catch (error) {
      reject({
        data: { message: error },
      });
    }
  });
}
