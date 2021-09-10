import axios, { AxiosResponse } from 'axios';
import jwt from 'jsonwebtoken';
import { HOST } from 'constants/url';

export class ResponseError extends Error {
  public response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super(response.statusText);
    this.response = response;
  }
}

function parseJSON(response: AxiosResponse) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

// function checkStatus(response: AxiosResponse) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }
//   throw new ResponseError(response);
// }

export async function request(payload, errorHandler?) {
  try {
    const auth = localStorage.getItem('auth') ? jwt.verify(localStorage.getItem('auth'), 'shhhhh') : null;
    let instance = axios.create({ baseURL: HOST });
    instance.interceptors.request.use(
      function (config) {
        config.headers.Authorization = auth ? `Bearer ${auth.token}` : '';
        return config;
      },
      error => Promise.reject(error),
    );
    instance.interceptors.response.use(
      response => response,
      error => {
        if (errorHandler) {
          errorHandler({ error }.error);
        }
        return Promise.reject(error);
      },
    );
    const fetchResponse = await instance(payload);
    return parseJSON(fetchResponse);
  } catch (error) {
    console.log(error);
  }
}
// request({ url: 'something', method: 'POST', data: { demo: 'demo' } });
