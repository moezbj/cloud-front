import axios from "axios";

const BaseURL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000/api"; // BASE URL
// eslint-disable-next-line
export let authorizationBearer = null;

export const setAuthorizationBearer = (token) => {
  authorizationBearer = token;
};

function axiosRequest(method, baseURL, url, params, headers) {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      method,
      url,
      timeout: 300000,
      ...params,
      headers: {
        ...headers,
      },
    })
      .then(
        (payload) => {
          resolve(payload.data);
        },
        (payload) => {
          if (payload.response) {
            const { response } = payload;
            if (response.status >= 400 && response.status < 500) {
              resolve(response.data);
            } else {
              reject(response);
            }
          } else {
            reject(payload);
          }
        }
      )
      .catch((e) => {
        throw e;
      });
  });
}

/* ------ Request POST ------ */
export function axiosPost(url, params, timeout = null) {
  let p = {
    sendToken: true,
    data: {},
    headers: {},
  };

  if (params) {
    p = { ...p, ...params };
  }

  let { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers = {
      ...headers,
      Authorization: `Bearer ${authorizationBearer}`,
    };
  }
  let reqParams = {};
  if (timeout) {
    reqParams = {
      data: p.data,
      timeout: timeout,
    };
  } else {
    reqParams = { data: p.data };
  }

  return axiosRequest("POST", BaseURL, url, reqParams, headers);
}

/* ------ Request PUT ------ */
export function axiosPut(url, params, timeout = null) {
  let p = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  let { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers = {
      ...headers,
      Authorization: `Bearer ${authorizationBearer}`,
    };
  }
  let reqParams = {};
  if (timeout) {
    reqParams = {
      data: p.data,
      timeout: timeout,
    };
  } else {
    reqParams = { data: p.data };
  }
  return axiosRequest("PUT", BaseURL, url, reqParams, headers);
}

/* ------ Request PATCH ------ */
export function axiosPatch(url, params, timeout = null) {
  let p = { sendToken: true, data: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  let { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers = {
      ...headers,
      Authorization: `Bearer ${authorizationBearer}`,
    };
  }
  let reqParams = {};
  if (timeout) {
    reqParams = {
      data: p.data,
      timeout: timeout,
    };
  } else {
    reqParams = { data: p.data };
  }
  return axiosRequest("PATCH", BaseURL, url, reqParams, headers);
}

/* ------ Request GET ------ */
export function axiosGet(url, params, timeout = null) {
  let p = { sendToken: true, params: {}, headers: {} };
  if (params) {
    p = { ...p, ...params };
  }
  let { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers = {
      ...headers,
      Authorization: `Bearer ${authorizationBearer}`,
    };
  }
  let reqParams = {};
  if (timeout) {
    reqParams = {
      params: p.params,
      timeout: timeout,
    };
  } else {
    reqParams = {
      params: p.params,
    };
  }
  return axiosRequest("GET", BaseURL, url, reqParams, headers);
}

/* ------ Request DELETE ------ */
export function axiosDelete(url, params, timeout = null) {
  let p = { sendToken: true, headers: {}, ...params };
  if (params) {
    p = { ...p, ...params };
  }
  const { headers } = p;
  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  let reqParams = {};
  if (timeout) {
    reqParams = {
      params: p.params,
      timeout: timeout,
    };
  } else {
    reqParams = {
      params: p.params,
    };
  }
  return axiosRequest("DELETE", BaseURL, url, reqParams, headers);
}

/* ------ Request POST files ------ */
export function axiosPostFilesData(url, params, timeout = 60000) {
  const p = {
    sendToken: true,
    form: {},
    headers: {},
    ...params,
  };
  const { headers } = p;

  if (p.sendToken && authorizationBearer) {
    headers.Authorization = `Bearer ${authorizationBearer}`;
  }
  let reqParams = {};
  if (timeout) {
    reqParams = { timeout: timeout, data: p.data };
  } else {
    reqParams = { data: p.data };
  }
  return axiosRequest("POST", BaseURL, url, reqParams, headers);
}
